/**
 * LayerRenderer Component - Handles creation and animation of all layer types
 * Manages 4 visualization layers with smooth transitions + Arc layer
 */

import { useMemo } from 'react';
import {
  ScatterplotLayer,
  GridCellLayer,
  ArcLayer,
  ColumnLayer,
} from '@deck.gl/layers';
import {
  getColorByValue,
  clusterDataByHexagon,
  generateArcConnections,
  aggregateByGrid,
} from '../utils/dataTransform';
import { ANIMATIONS, LAYER_CONFIG } from '../config/mapConfig';

export const useLayerRenderer = (data, visibleLayers, selectedItem, animationPhase) => {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    const newLayers = [];
    const minValue = Math.min(...data.map((d) => d.value));
    const maxValue = Math.max(...data.map((d) => d.value));

    // Scatterplot Layer - Individual points with animation
    if (visibleLayers.includes('scatter-layer')) {
      newLayers.push(
        new ScatterplotLayer({
          id: 'scatter-layer',
          data,
          pickable: true,
          opacity: 0.85,
          radiusScale: LAYER_CONFIG.scatterplot.radiusScale,
          radiusMinPixels: LAYER_CONFIG.scatterplot.minRadius,
          radiusMaxPixels: LAYER_CONFIG.scatterplot.maxRadius,
          getPosition: (d) => [d.longitude, d.latitude],
          getRadius: (d) => {
            const baseRadius = Math.sqrt(d.value) * 10 || 50;
            const isSelected = selectedItem?.id === d.id;
            return isSelected ? baseRadius * 1.5 : baseRadius;
          },
          getFillColor: (d) => getColorByValue(d.value, minValue, maxValue),
          getLineColor: (d) => (selectedItem?.id === d.id ? [255, 0, 0, 255] : [0, 0, 0, 100]),
          lineWidthMinPixels: (d) => (selectedItem?.id === d.id ? 3 : 1),
          lineWidthMaxPixels: (d) => (selectedItem?.id === d.id ? 5 : 2),
          transitions: {
            getRadius: ANIMATIONS.transitions.scatterRadius,
          },
        })
      );
    }

    // Grid Layer - Aggregated grid with elevation
    if (visibleLayers.includes('grid-layer')) {
      const gridData = aggregateByGrid(data, 0.1);
      newLayers.push(
        new GridCellLayer({
          id: 'grid-layer',
          data: gridData,
          pickable: true,
          extruded: LAYER_CONFIG.grid.extruded,
          cellSize: LAYER_CONFIG.grid.cellSize,
          // Use a stable elevation scale to avoid up/down oscillation
          elevationScale: LAYER_CONFIG.grid.elevationScale,
          getPosition: (d) => [d.longitude, d.latitude],
          getFillColor: (d) => getColorByValue(d.value, minValue, maxValue),
          getElevation: (d) => d.value * 50,
          transitions: {
            getElevation: ANIMATIONS.transitions.gridElevation,
          },
        })
      );
    }

    // Column/3D Heatmap Layer - Uses ColumnLayer for density
    if (visibleLayers.includes('heatmap-layer')) {
      const gridData = aggregateByGrid(data, 0.15);
      newLayers.push(
        new ColumnLayer({
          id: 'heatmap-layer',
          data: gridData,
          pickable: true,
          radius: 50,
          // stable elevation for heatmap columns
          elevationScale: 50,
          getPosition: (d) => [d.longitude, d.latitude],
          getFillColor: (d) => getColorByValue(d.value, minValue, maxValue),
          getElevation: (d) => d.count * 10,
          transitions: {
            getElevation: ANIMATIONS.transitions.heatmapIntensity,
          },
        })
      );
    }

    // Hexagon/Column Layer - Hexagonal binning aggregation
    if (visibleLayers.includes('hexagon-layer')) {
      const hexagonData = clusterDataByHexagon(data, LAYER_CONFIG.hexagon.radius);
      newLayers.push(
        new ColumnLayer({
          id: 'hexagon-layer',
          data: hexagonData,
          pickable: true,
          radius: 150,
          // keep hex elevation stable to avoid distracting motion
          elevationScale: LAYER_CONFIG.hexagon.elevationScale,
          getPosition: (d) => [d.longitude, d.latitude],
          getFillColor: (d) => getColorByValue(d.value, minValue, maxValue),
          getElevation: (d) => d.value * 100,
          transitions: {
            getElevation: ANIMATIONS.transitions.gridElevation,
          },
        })
      );
    }

    // Arc Layer - Connection paths between points
    if (visibleLayers.includes('arc-layer')) {
      const arcData = generateArcConnections(data, 15);
      newLayers.push(
        new ArcLayer({
          id: 'arc-layer',
          data: arcData,
          pickable: true,
          widthScale: LAYER_CONFIG.arc.widthScale * animationPhase,
          widthMinPixels: LAYER_CONFIG.arc.widthMinPixels,
          widthMaxPixels: LAYER_CONFIG.arc.widthMaxPixels,
          getSourcePosition: (d) => d.sourcePosition,
          getTargetPosition: (d) => d.targetPosition,
          getSourceColor: [10, 176, 233],
          getTargetColor: [255, 107, 107],
          getWidth: (d) => 1,
          transitions: {
            getWidth: ANIMATIONS.transitions.arcWidth,
          },
        })
      );
    }

    return newLayers;
  }, [data, visibleLayers, selectedItem, animationPhase]);
};
