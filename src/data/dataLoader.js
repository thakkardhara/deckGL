

import { SAMPLE_LOCATIONS, generateRandomLocations } from './sampleData';
import { transformLocationData } from '../utils/dataTransform';

class DataLoader {
  static loadSampleData() {
    return transformLocationData(SAMPLE_LOCATIONS);
  }

  static generateData(count = 100) {
    const randomData = generateRandomLocations(count);
    return transformLocationData(randomData);
  }

  static async loadFromAPI(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      return transformLocationData(data);
    } catch (error) {
      console.error('Error loading data from API:', error);
      return DataLoader.loadSampleData();
    }
  }

  static exportToGeoJSON(data) {
    return {
      type: 'FeatureCollection',
      features: data.map((item) => ({
        type: 'Feature',
        properties: {
          id: item.id,
          label: item.label,
          value: item.value,
          description: item.description,
          timestamp: item.timestamp,
        },
        geometry: {
          type: 'Point',
          coordinates: [item.longitude, item.latitude],
        },
      })),
    };
  }

  static exportToCSV(data) {
    const headers = ['ID', 'Name', 'Longitude', 'Latitude', 'Value', 'Description', 'Timestamp'];
    const rows = data.map((item) => [
      item.id,
      item.label,
      item.longitude,
      item.latitude,
      item.value,
      item.description,
      item.timestamp,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    return csv;
  }

  static downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

export default DataLoader;
