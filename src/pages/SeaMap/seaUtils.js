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
    const distanceInKm = R * c;
    const distanceInNauticalMiles = distanceInKm * 0.539957;
    return distanceInNauticalMiles;
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
  let crossedAntimeridian = Math.abs(lon1 - lon2) > 180;

  for (let i = 0; i <= numSegments; i++) {
    const t = i / numSegments;
    let [lon, lat] = interpolate(t);
    if (lon < 0) {
      lon += 360;
    }
    segments.push([lat, lon]);
  }

  if (crossedAntimeridian) {
    const midIndex = Math.floor(segments.length / 2);
    const part1 = segments.slice(0, midIndex + 1);
    const part2 = segments.slice(midIndex);
    return [part1, part2];
  } else {
    return [segments];
  }
};
