import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./SeaMap.module.css";
import data from "../../data/updated_points (1).json";
import { calculateDistance, calculateGeodesicSegments } from "./seaUtils";

// Создание кастомной иконки для маркера
const customMarkerIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBDMjMuMjgzIDAgMzAgNi43MTcgMzAgMTVDMzAgMjMuMjgzIDIzLjI4MyAzMCAxNSAzMFMwIDIzLjI4MyAwIDE1QzAgNi43MTcgNi43MTcgMCAxNSAwWiIgZmlsbD0iIzAwRkZGRiIvPgo8L3N2Zz4K",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const SeaMap = () => {
  const [points, setPoints] = useState(data);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const newLines = [];
    const pointsMap = new Map();

    points.forEach((point) => pointsMap.set(point.id, point));

    points.forEach((point) => {
      if (point.connections) {
        point.connections.forEach((connId) => {
          const connectedPoint = pointsMap.get(connId);
          if (connectedPoint) {
            const segments = calculateGeodesicSegments(
              point.latitude,
              point.longitude,
              connectedPoint.latitude,
              connectedPoint.longitude
            );
            newLines.push({
              start: [point.latitude, point.longitude],
              end: [connectedPoint.latitude, connectedPoint.longitude],
              distance: calculateDistance(
                point.latitude,
                point.longitude,
                connectedPoint.latitude,
                connectedPoint.longitude
              ),
              segments: segments,
            });
          }
        });
      }
    });

    setLines(newLines);
  }, [points]);

  const handleDragEnd = (id, newPos) => {
    const updatedPoints = points.map((point) =>
      point.id === id
        ? { ...point, latitude: newPos.lat, longitude: newPos.lng }
        : point
    );
    setPoints(updatedPoints);
  };

  const handleSave = () => {
    const updatedData = JSON.stringify(points, null, 2);
    const blob = new Blob([updatedData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "updated_points.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderMarkers = (points) => {
    return points.map((point) => (
      <Marker
        key={point.id}
        position={[point.latitude, point.longitude]}
        icon={customMarkerIcon}
        draggable={true}
        eventHandlers={{
          dragend: (event) => handleDragEnd(point.id, event.target.getLatLng()),
        }}
        title={point.name}
      />
    ));
  };

  const GeodesicLine = ({ segments, distance }) => {
    const map = useMap();

    useEffect(() => {
      segments.forEach((segment) => {
        const line = L.polyline(segment, {
          color: "black",
          weight: 3,
          opacity: 0.7,
        }).addTo(map);

        line.on("mouseover", (e) => {
          const popup = L.popup()
            .setLatLng(e.latlng)
            .setContent(`Дистанция: ${distance.toFixed(2)} морских миль`)
            .openOn(map);
          line.on("mouseout", () => {
            map.closePopup(popup);
          });
        });

        return () => {
          map.removeLayer(line);
        };
      });
    }, [map, segments, distance]);

    return null;
  };

  return (
    <div className={styles.mapContainer}>
      <button className={styles.saveButton} onClick={handleSave}>
        Сохранить
      </button>
      <MapContainer
        center={[60, 0]}
        zoom={3}
        className={styles.map}
        worldCopyJump={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {renderMarkers(points)}
        {lines.map((line, index) => (
          <GeodesicLine
            key={index}
            segments={line.segments}
            distance={line.distance}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default SeaMap;
