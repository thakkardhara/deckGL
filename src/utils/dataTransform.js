

/**
 * Utility functions for data transformation with performance optimization
 */

export const transformLocationData = (rawData) => {
  return rawData.map((item, index) => ({
    id: item.id || `loc-${index}`,
    longitude: item.lon || item.longitude,
    latitude: item.lat || item.latitude,
    value: item.value || 0,
    label: item.name || item.label || '',
    description: item.description || '',
    timestamp: item.timestamp || new Date(),
  }));
};

export const calculateBounds = (points) => {
  if (!points || points.length === 0) return null;

  const lons = points.map((p) => p.longitude);
  const lats = points.map((p) => p.latitude);

  return {
    minLon: Math.min(...lons),
    maxLon: Math.max(...lons),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
  };
};

// Get color based on value range
export const getColorByValue = (value, min, max) => {
  const ratio = (value - min) / (max - min);
  
  if (ratio < 0.33) {
    return [200, 230, 201, 200]; // Green
  } else if (ratio < 0.66) {
    return [255, 193, 7, 200]; // Amber
  } else {
    return [244, 67, 54, 200]; // Red
  }
};

// Cluster data for hexagon layer
export const clusterDataByHexagon = (data, radius = 1000) => {
  const clusters = new Map();
  
  data.forEach((point) => {
    const key = `${Math.round(point.longitude / radius)},${Math.round(point.latitude / radius)}`;
    
    if (!clusters.has(key)) {
      clusters.set(key, {
        points: [],
        longitude: point.longitude,
        latitude: point.latitude,
        value: 0,
        count: 0,
      });
    }
    
    const cluster = clusters.get(key);
    cluster.points.push(point);
    cluster.value += point.value;
    cluster.count += 1;
  });

  return Array.from(clusters.values()).map((cluster) => ({
    ...cluster,
    value: cluster.value / cluster.count,
  }));
};

// Generate arc connections between top points
export const generateArcConnections = (data, topN = 10) => {
  const sorted = [...data].sort((a, b) => b.value - a.value).slice(0, topN);
  const arcs = [];
  
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < Math.min(i + 3, sorted.length); j++) {
      arcs.push({
        sourcePosition: [sorted[i].longitude, sorted[i].latitude],
        targetPosition: [sorted[j].longitude, sorted[j].latitude],
        value: sorted[i].value,
      });
    }
  }
  
  return arcs;
};

// Virtualize data for performance
export const virtualizeData = (data, chunkSize = 10000) => {
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
};

// Aggregate data by grid
export const aggregateByGrid = (data, gridSize = 50) => {
  const grid = {};
  
  data.forEach((point) => {
    const gridX = Math.floor(point.longitude / gridSize);
    const gridY = Math.floor(point.latitude / gridSize);
    const key = `${gridX},${gridY}`;
    
    if (!grid[key]) {
      grid[key] = {
        longitude: (gridX + 0.5) * gridSize,
        latitude: (gridY + 0.5) * gridSize,
        count: 0,
        value: 0,
        items: [],
      };
    }
    
    grid[key].count += 1;
    grid[key].value += point.value;
    grid[key].items.push(point);
  });

  return Object.values(grid).map((g) => ({
    ...g,
    value: g.value / g.count,
  }));
};
