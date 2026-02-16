import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, GridCellLayer } from '@deck.gl/layers';
import { MAP_CONFIG } from '../config/mapConfig';

const MapContainer = ({ data, visibleLayers }) => {
  const [viewState, setViewState] = useState(MAP_CONFIG.initialViewState);
  const [layers, setLayers] = useState([]);
  const [hoveredObject, setHoveredObject] = useState(null);

  useEffect(() => {
    if (data.length === 0) return;

    const newLayers = [];

    // Scatterplot Layer
    if (visibleLayers.includes('scatter-layer')) {
      newLayers.push(
        new ScatterplotLayer({
          id: 'scatter-layer',
          data,
          pickable: true,
          opacity: 0.8,
          radiusScale: 50,
          radiusMinPixels: 4,
          radiusMaxPixels: 100,
          getPosition: (d) => [d.longitude, d.latitude],
          getRadius: (d) => Math.sqrt(d.value) * 10 || 50,
          getFillColor: [14, 165, 233, 200], // primary-500 blue
          getLineColor: [0, 0, 0, 255],
          lineWidthMinPixels: 1,
          onHover: (info) => setHoveredObject(info.object),
        })
      );
    }

    // Grid Layer
    if (visibleLayers.includes('grid-layer')) {
      newLayers.push(
        new GridCellLayer({
          id: 'grid-layer',
          data,
          pickable: true,
          extruded: true,
          cellSize: 200,
          elevationScale: 50,
          getPosition: (d) => [d.longitude, d.latitude],
          getFillColor: [139, 92, 246, 150], 
          getElevation: (d) => d.value * 50,
          onHover: (info) => setHoveredObject(info.object),
        })
      );
    }

    setLayers(newLayers);
  }, [data, visibleLayers]);

  const handleViewStateChange = ({ viewState: newViewState }) => {
    setViewState(newViewState);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-50 to-white">
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        className="w-full h-full"
      >
        {/* Tooltip - for short details */}
        {hoveredObject && (
          <div
            className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 p-3 z-50 pointer-events-none animate-fade-in"
            style={{
              left: `${Math.min(hoveredObject.x, window.innerWidth - 250)}px`,
              top: `${Math.max(hoveredObject.y - 100, 10)}px`,
              maxWidth: '220px',
            }}
          >
            <div className="font-bold text-sm text-gray-800 mb-2 truncate">
              {hoveredObject.label}
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div><span className="font-semibold text-primary-600">Value:</span> {hoveredObject.value}</div>
              <div><span className="font-semibold text-primary-600">Lat:</span> {hoveredObject.latitude.toFixed(4)}</div>
              <div><span className="font-semibold text-primary-600">Lon:</span> {hoveredObject.longitude.toFixed(4)}</div>
            </div>
          </div>
        )}
      </DeckGL>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95">
          <div className="text-6xl mb-4">📍</div>
          <div className="text-xl font-semibold text-gray-700">No data available</div>
          <div className="text-gray-500 text-sm mt-2">Load data to visualize locations</div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
