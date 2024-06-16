import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const GeodesicLine = ({ id, segments, start, end, distance, handleLineClick }) => {
  const mapInstance = useMap();

  useEffect(() => {
    const lines = segments.map((segment) => {
      const line = L.polyline(segment, {
        color: "#56B9F2",
        weight: 1,
        opacity: 1,
      }).addTo(mapInstance);

      line.on("mouseover", (e) => {
        const popup = L.popup()
          .setLatLng(e.latlng)
          .setContent(`Дистанция: ${distance.toFixed(2)} морских милей`)
          .openOn(mapInstance);
        line.on("mouseout", () => {
          mapInstance.closePopup(popup);
        });
      });

      line.on("click", (event) => {
        handleLineClick(event, start, end);
      });

      return line;
    });

    return () => {
      lines.forEach((line) => mapInstance.removeLayer(line));
    };
  }, [mapInstance, segments, distance, handleLineClick, start, end]);

  return null;
};

export default GeodesicLine;
