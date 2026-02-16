// Layer types with descriptions and colors
export const LAYER_TYPES = {
  SCATTERPLOT: 'scatter-layer',
  GRID: 'grid-layer',
  HEATMAP: 'heatmap-layer',
  HEXAGON: 'hexagon-layer',
  ARC: 'arc-layer',
};

// Layer metadata for legend
export const LAYER_METADATA = {
  'scatter-layer': {
    name: '📍 Scatterplot',
    description: 'Individual point markers',
    color: '#0EA5E9',
    icon: '📍',
  },
  'grid-layer': {
    name: '🔲 Grid Cells',
    description: 'Aggregated grid cells with elevation',
    color: '#8B5CF6',
    icon: '🔲',
  },
  'heatmap-layer': {
    name: '🔥 Heatmap',
    description: 'Density heat visualization',
    color: '#FF6B6B',
    icon: '🔥',
  },
  'hexagon-layer': {
    name: '⬡ Hexagon',
    description: 'Hexagonal binning with aggregation',
    color: '#FBBF24',
    icon: '⬡',
  },
  'arc-layer': {
    name: '🌐 Arc Routes',
    description: 'Connection paths between points',
    color: '#10B981',
    icon: '🌐',
  },
};

// Color scale for value-based coloring
export const COLOR_SCALES = {
  LOW: [200, 230, 201],
  MEDIUM: [255, 193, 7],
  HIGH: [244, 67, 54],
};

// Export formats
export const EXPORT_FORMATS = {
  GEOJSON: 'geojson',
  CSV: 'csv',
};

// Performance settings
export const PERFORMANCE_CONFIG = {
  DATA_CHUNK_SIZE: 10000,
  ANIMATION_SPEED: 0.6,
  TRANSITION_DURATION: 300,
};
