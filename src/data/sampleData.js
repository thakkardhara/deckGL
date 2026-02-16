

export const SAMPLE_LOCATIONS = [
  // Manhattan Core
  { id: 1, longitude: -73.9857, latitude: 40.7484, value: 95, name: 'Times Square', description: 'Busy tourist area', timestamp: new Date() },
  { id: 2, longitude: -73.9776, latitude: 40.7649, value: 92, name: 'Central Park North', description: 'Park entrance', timestamp: new Date() },
  { id: 3, longitude: -73.9626, latitude: 40.7489, value: 88, name: 'Grand Central', description: 'Transit hub', timestamp: new Date() },
  { id: 4, longitude: -74.0064, latitude: 40.7128, value: 90, name: 'One World Trade', description: 'Financial district', timestamp: new Date() },
  { id: 5, longitude: -74.0113, latitude: 40.7141, value: 85, name: 'Wall Street', description: 'Financial center', timestamp: new Date() },

  // Brooklyn
  { id: 6, longitude: -73.9442, latitude: 40.6782, value: 72, name: 'Downtown Brooklyn', description: 'Brooklyn heights', timestamp: new Date() },
  { id: 7, longitude: -73.9776, latitude: 40.6501, value: 68, name: 'Prospect Park', description: 'Urban park', timestamp: new Date() },
  { id: 8, longitude: -73.9501, latitude: 40.6501, value: 75, name: 'Williamsburg', description: 'Trendy neighborhood', timestamp: new Date() },

  // Queens
  { id: 9, longitude: -73.8648, latitude: 40.7282, value: 65, name: 'Long Island City', description: 'Waterfront area', timestamp: new Date() },
  { id: 10, longitude: -73.8298, latitude: 40.7614, value: 60, name: 'Astoria', description: 'Queens neighborhood', timestamp: new Date() },

  // Additional Manhattan Areas
  { id: 11, longitude: -73.9565, latitude: 40.7824, value: 80, name: 'Upper West Side', description: 'Residential area', timestamp: new Date() },
  { id: 12, longitude: -73.9670, latitude: 40.7831, value: 77, name: 'Upper East Side', description: 'Upscale area', timestamp: new Date() },
  { id: 13, longitude: -73.9776, latitude: 40.7549, value: 82, name: 'Midtown', description: 'Business district', timestamp: new Date() },
  { id: 14, longitude: -74.0060, latitude: 40.7505, value: 79, name: 'Chelsea', description: 'Art district', timestamp: new Date() },
  { id: 15, longitude: -73.9897, latitude: 40.7306, value: 73, name: 'Soho', description: 'Shopping area', timestamp: new Date() },
  { id: 16, longitude: -73.9857, latitude: 40.7181, value: 71, name: 'Tribeca', description: 'Residential area', timestamp: new Date() },
  { id: 17, longitude: -73.9776, latitude: 40.7128, value: 68, name: 'Lower East Side', description: 'Historic neighborhood', timestamp: new Date() },
  { id: 18, longitude: -73.9857, latitude: 40.8084, value: 64, name: 'Harlem', description: 'Historic district', timestamp: new Date() },
  { id: 19, longitude: -73.9442, latitude: 40.8448, value: 62, name: 'Washington Heights', description: 'Northern Manhattan', timestamp: new Date() },
  { id: 20, longitude: -73.8648, latitude: 40.8448, value: 58, name: 'Inwood', description: 'Northeastern area', timestamp: new Date() },
];

export const generateRandomLocations = (count = 100, bounds = null) => {
  const defaultBounds = {
    minLon: -74.02,
    maxLon: -73.93,
    minLat: 40.70,
    maxLat: 40.82,
  };

  const b = bounds || defaultBounds;
  const locations = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    locations.push({
      id: 1000 + i,
      longitude: Math.random() * (b.maxLon - b.minLon) + b.minLon,
      latitude: Math.random() * (b.maxLat - b.minLat) + b.minLat,
      value: Math.floor(Math.random() * 100),
      name: `Location ${i + 1}`,
      description: 'Auto-generated location',
      timestamp: now,
    });
  }

  return locations;
};

export const HEATMAP_DATA = SAMPLE_LOCATIONS.map((loc) => ({
  ...loc,
  weight: loc.value / 100,
}));
