import React, { useState } from 'react';

const Sidebar = ({
  data,
  onLayerToggle,
  visibleLayers,
  onSearchChange,
  onExport,
  selectedItem,
  onItemSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    layers: true,
    controls: true,
    data: true,
  });

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const filteredData = data.filter(
    (item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: data.length,
    visible: visibleLayers.length,
    average: data.length > 0
      ? (data.reduce((sum, item) => sum + item.value, 0) / data.length).toFixed(2)
      : 0,
  };

  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 shadow-xl flex flex-col overflow-hidden animate-slide-in-left">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">🗺️</span>
          Geo Maps
        </h1>
        <p className="text-primary-100 text-sm mt-1">Interactive Mapping Platform</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={handleSearch}
            className="input-field pl-10 text-sm"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        {/* Statistics */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-600">📊 Statistics</h3>
          <div className="card p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700 font-medium">Total Items</span>
              <span className="text-lg font-bold text-primary-600">{stats.total}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700 font-medium">Visible Layers</span>
              <span className="text-lg font-bold text-accent-600">{stats.visible}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-medium">Avg Value</span>
              <span className="text-lg font-bold text-purple-600">{stats.average}</span>
            </div>
          </div>
        </div>

        {/* Layers */}
        <div>
          <h3
            className="text-xs uppercase tracking-wider font-bold text-gray-600 cursor-pointer hover:text-primary-600 transition-colors flex items-center justify-between mb-3"
            onClick={() => toggleSection('layers')}
          >
            <span>🎨 Layers</span>
            <span className="text-sm">{expandedSections.layers ? '▼' : '▶'}</span>
          </h3>
          {expandedSections.layers && (
            <div className="space-y-3">
              {['scatter-layer', 'grid-layer'].map((layer) => (
                <label key={layer} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={visibleLayers.includes(layer)}
                    onChange={() => onLayerToggle(layer)}
                    className="w-5 h-5 accent-primary-600 rounded cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {layer === 'scatter-layer' && '📍 Scatterplot'}
                    {layer === 'grid-layer' && '🔲 Grid Cells'}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Export */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-600">⬇️ Export Data</h3>
          <div className="space-y-2">
            <button
              onClick={() => onExport('geojson')}
              className="btn-primary w-full text-sm"
            >
              📍 GeoJSON
            </button>
            <button
              onClick={() => onExport('csv')}
              className="btn-secondary w-full text-sm"
            >
              📊 CSV
            </button>
          </div>
        </div>

        {/* Data List */}
        <div>
          <h3
            className="text-xs uppercase tracking-wider font-bold text-gray-600 cursor-pointer hover:text-primary-600 transition-colors flex items-center justify-between mb-3"
            onClick={() => toggleSection('data')}
          >
            <span>📋 Locations</span>
            <span className="text-sm">{expandedSections.data ? '▼' : '▶'}</span>
          </h3>
          {expandedSections.data && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredData.slice(0, 15).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onItemSelect(item)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedItem?.id === item.id
                      ? 'bg-primary-100 border-2 border-primary-500 shadow-md'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  <div className="font-semibold text-sm text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-600 mt-1">Value: <span className="font-bold text-primary-600">{item.value}</span></div>
                </div>
              ))}
              {filteredData.length > 15 && (
                <div className="text-center text-xs text-gray-500 py-2">
                  +{filteredData.length - 15} more items
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 bg-gray-50 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-lg">✓</span>
          <span><strong>{data.length}</strong> locations loaded</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
