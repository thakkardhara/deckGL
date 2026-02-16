/**
 * MapLegend Component - Beautiful legend showing active layers and color scale
 */

import React, { useState } from 'react';
import { LAYER_METADATA, COLOR_SCALES } from '../utils/constants';

const MapLegend = ({ visibleLayers }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="absolute bottom-6 left-80 z-50 animate-slide-in-up">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div
          className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎨</span>
              <h3 className="font-bold">Layer Legend</h3>
            </div>
            <span className="text-xl transition-transform" style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>
              ⌄
            </span>
          </div>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto bg-gray-50">
            {/* Active Layers */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Active Layers</h4>
              <div className="space-y-2">
                {visibleLayers.length > 0 ? (
                  visibleLayers.map((layerId) => {
                    const metadata = LAYER_METADATA[layerId];
                    if (!metadata) return null;
                    return (
                      <div key={layerId} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center text-sm"
                          style={{ backgroundColor: metadata.color + '30', color: metadata.color }}
                        >
                          {metadata.icon}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{metadata.name}</div>
                          <div className="text-xs text-gray-500">{metadata.description}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-sm text-gray-500 italic p-2">No layers active</div>
                )}
              </div>
            </div>

            {/* Color Scale */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Value Scale</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-md"
                    style={{ backgroundColor: `rgb(${COLOR_SCALES.LOW.join(',')})` }}
                  ></div>
                  <span className="text-sm text-gray-700">Low Values</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-md"
                    style={{ backgroundColor: `rgb(${COLOR_SCALES.MEDIUM.join(',')})` }}
                  ></div>
                  <span className="text-sm text-gray-700">Medium Values</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-md"
                    style={{ backgroundColor: `rgb(${COLOR_SCALES.HIGH.join(',')})` }}
                  ></div>
                  <span className="text-sm text-gray-700">High Values</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-blue-900 mb-2"></div>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Drag to pan the map</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Right-click + drag to rotate</li>
                <li>• Larger animations = live data update</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLegend;
