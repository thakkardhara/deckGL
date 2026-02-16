

export const transformLocationData = (rawData) => {
  return rawData.map((item) => ({
    id: item.id,
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
