
export const MAP_CONFIG = {
  initialViewState: {
    longitude: -74.0,
    latitude: 40.7,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  },
  mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};

export const COLORS = {
  primary: '#FF8C00',
  secondary: '#4A90E2',
  success: '#008743',
  warning: '#FCC021',
  danger: '#D50000',
  text: '#333333',
  lightText: '#666666',
  border: '#CCCCCC',
  background: '#FFFFFF',
};

export const ANIMATIONS = {
  duration: 300,
  easing: (t) => t,
  transitions: {
    scatterRadius: { duration: 300, delay: 0 },
    gridElevation: { duration: 600, delay: 0 },
    heatmapIntensity: { duration: 800, delay: 0 },
    arcWidth: { duration: 400, delay: 0 },
  },
};

// Layer configuration for large data sets
export const LAYER_CONFIG = {
  scatterplot: {
    maxRadius: 100,
    minRadius: 4,
    radiusScale: 50,
  },
  grid: {
    cellSize: 200,
    elevationScale: 50,
    extruded: true,
  },
  heatmap: {
    aggregationSize: 50,
    radiusPixels: 50,
    intensity: 1,
  },
  hexagon: {
    radius: 1000,
    elevationScale: 50,
    coverage: 0.88,
  },
  arc: {
    widthScale: 20,
    widthMinPixels: 1,
    widthMaxPixels: 30,
  },
};
