import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MapContainer from './components/MapContainer';
import DetailPanel from './components/DetailPanel';
import DataLoader from './data/dataLoader';
import './index.css';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visibleLayers, setVisibleLayers] = useState(['scatter-layer']);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        // Load sample data
        const loadedData = DataLoader.loadSampleData();
        setData(loadedData);
        setFilteredData(loadedData);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to sample data
        const fallbackData = DataLoader.loadSampleData();
        setData(fallbackData);
        setFilteredData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Handle search filtering
  const handleSearchChange = (term) => {
    if (term.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.label.toLowerCase().includes(term.toLowerCase()) ||
          item.description.toLowerCase().includes(term.toLowerCase()) ||
          item.value.toString().includes(term)
      );
      setFilteredData(filtered);
    }
  };

  // Handle layer toggle
  const handleLayerToggle = (layerId) => {
    setVisibleLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    );
  };

  // Handle export
  const handleExport = (format) => {
    if (format === 'geojson') {
      const geoJson = DataLoader.exportToGeoJSON(filteredData);
      const content = JSON.stringify(geoJson, null, 2);
      DataLoader.downloadFile(content, 'locations.geojson', 'application/json');
    } else if (format === 'csv') {
      const csv = DataLoader.exportToCSV(filteredData);
      DataLoader.downloadFile(csv, 'locations.csv', 'text/csv');
    }
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg text-gray-600 font-semibold">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar
        data={filteredData}
        onLayerToggle={handleLayerToggle}
        visibleLayers={visibleLayers}
        onSearchChange={handleSearchChange}
        onExport={handleExport}
        selectedItem={selectedItem}
        onItemSelect={handleItemSelect}
      />
      <div className="flex-1 relative overflow-hidden">
        <MapContainer
          data={visibleLayers.length > 0 ? filteredData : []}
          visibleLayers={visibleLayers}
        />
        <div className="fixed bottom-6 left-80 z-50 animate-fade-in">
          {selectedItem && (
            <DetailPanel
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
