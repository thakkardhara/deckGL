import React from 'react';

const DetailPanel = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-40 animate-slide-in-right">
   
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl transition-colors hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
      >
        ✕
      </button>

      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 pr-8 mb-1">{item.label}</h2>
      <p className="text-xs text-gray-500 mb-4">Location Details</p>

      {/* details */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
     
        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">ID</div>
          <div className="text-sm font-mono text-gray-800 mt-1">{item.id}</div>
        </div>

        {/* Value */}
        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Value</div>
          <div className="text-lg font-bold text-primary-600 mt-1">{item.value}</div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Latitude</div>
            <div className="text-sm font-mono text-gray-800 mt-1">{item.latitude.toFixed(6)}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Longitude</div>
            <div className="text-sm font-mono text-gray-800 mt-1">{item.longitude.toFixed(6)}</div>
          </div>
        </div>

        {/* Description */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Description</div>
          <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
        </div>

        {/* Timestamp */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Last Updated</div>
          <div className="text-sm text-gray-700 mt-1">{new Date(item.timestamp).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Footer Action */}
      <button
        onClick={onClose}
        className="btn-secondary w-full mt-4 text-sm"
      >
        Close Details
      </button>
    </div>
  );
};

export default DetailPanel;
