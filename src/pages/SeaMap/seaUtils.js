import * as d3 from "d3-geo";

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calculateGeodesicSegments = (
  lat1,
  lon1,
  lat2,
  lon2,
  numSegments = 100
) => {
  const interpolate = d3.geoInterpolate([lon1, lat1], [lon2, lat2]);
  const segments = [];
  for (let i = 0; i <= numSegments; i++) {
    const t = i / numSegments;
    let [lon, lat] = interpolate(t);
    if (Math.abs(lon1 - lon2) > 180) {
      if (lon1 > lon2) {
        lon1 -= 360;
      } else {
        lon2 -= 360;
      }
      if (lon > 180) lon -= 360;
      if (lon < -180) lon += 360;
    }
    segments.push([lat, lon]);
  }
  return segments;
};
