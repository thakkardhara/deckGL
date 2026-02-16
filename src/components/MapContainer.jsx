import React, { useEffect, useState, useRef } from 'react';
import DeckGL from '@deck.gl/react';
import { MAP_CONFIG } from '../config/mapConfig';
import { useLayerRenderer } from './LayerRenderer';
import MapLegend from './MapLegend';

const MapContainer = ({ data, visibleLayers, selectedItem, animationMode = 'subtle' }) => {
  const [viewState, setViewState] = useState(MAP_CONFIG.initialViewState);
  const [animationPhase, setAnimationPhase] = useState(1);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const fpsTimesRef = useRef([]);
  const [fps, setFps] = useState(0);

  // Animation behavior based on selected mode:
  // - 'static': no animation (phase=1)
  // - 'subtle': one-time entrance transition from 0 -> 1
  // - 'pulse': slight, slow oscillation with small amplitude
  useEffect(() => {
    // cancel any existing RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (animationMode === 'static') {
      setAnimationPhase(1);
      return;
    }

    let mounted = true;

    if (animationMode === 'subtle') {
      // one-time entrance animation
      startRef.current = null;
      const duration = 800;
      const step = (t) => {
        if (!mounted) return;
        if (!startRef.current) startRef.current = t;
        const progress = Math.min((t - startRef.current) / duration, 1);
        setAnimationPhase(0.2 + 0.8 * progress);
        if (progress < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    } else if (animationMode === 'pulse') {
      // gentle oscillation
      startRef.current = null;
      const step = (t) => {
        if (!mounted) return;
        if (!startRef.current) startRef.current = t;
        const elapsed = (t - startRef.current) / 1000; // seconds
        const phase = 0.9 + 0.05 * Math.sin(elapsed * Math.PI * 2 * 0.25); // slow pulse
        setAnimationPhase(phase);
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    }

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animationMode]);

  // Lightweight FPS monitor (runs while component mounted)
  useEffect(() => {
    let mounted = true;
    const loop = (t) => {
      if (!mounted) return;
      const times = fpsTimesRef.current;
      times.push(t);
      // keep last 1s
      while (times.length > 0 && times[0] < t - 1000) times.shift();
      setFps(times.length);
      requestAnimationFrame(loop);
    };
    const r = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      cancelAnimationFrame(r);
    };
  }, []);

  const layers = useLayerRenderer(data, visibleLayers, selectedItem, animationPhase);

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
        {/* Tooltip */}
        {selectedItem && (
          <div
            className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 p-3 z-50 pointer-events-none animate-fade-in"
            style={{
              left: `${Math.min(selectedItem.x || window.innerWidth / 2, window.innerWidth - 250)}px`,
              top: `${Math.max((selectedItem.y || 100) - 100, 10)}px`,
              maxWidth: '220px',
            }}
          >
            <div className="font-bold text-sm text-gray-800 mb-2 truncate">
              {selectedItem.label}
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div><span className="font-semibold text-primary-600">Value:</span> {selectedItem.value}</div>
              <div><span className="font-semibold text-primary-600">Lat:</span> {selectedItem.latitude.toFixed(4)}</div>
              <div><span className="font-semibold text-primary-600">Lon:</span> {selectedItem.longitude.toFixed(4)}</div>
            </div>
          </div>
        )}
      </DeckGL>

      {/* Legend */}
      <MapLegend visibleLayers={visibleLayers} />

      {/* Performance Monitor */}
      <div className="absolute top-6 right-6 bg-white bg-opacity-90 rounded-lg shadow-md p-3 text-xs z-40 max-w-48">
          <div className="font-bold text-gray-700 mb-2">📊 Performance</div>
          <div className="text-gray-600 space-y-1">
            <div>Data Points: <span className="font-semibold">{data.length.toLocaleString()}</span></div>
            <div>Active Layers: <span className="font-semibold">{visibleLayers.length}</span></div>
            <div>Animation Mode: <span className="font-semibold">{animationMode}</span></div>
            <div>Animation Phase: <span className="font-semibold">{Math.round(animationPhase * 100)}%</span></div>
            <div>FPS: <span className="font-semibold">{fps}</span></div>
          </div>
      </div>

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

