import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./SeaMap.module.css";
import data from "../../data/initial_points.json";
import {
  calculateDistance,
  calculateGeodesicSegments,
  generateUniqueId,
} from "./seaUtils";

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
  const [map, setMap] = useState(null);

  useEffect(() => {
    updateLines();
  }, [points]);

  const updateLines = () => {
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
              id: `${point.id}-${connectedPoint.id}`,
              start: point,
              end: connectedPoint,
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
  };

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

  const handleLineClick = (event, start, end) => {
    const newLat = event.latlng.lat;
    const newLng = event.latlng.lng;
    const newId = generateUniqueId();
    const newName = prompt("Введите название новой точки:", "Новая точка");

    if (!newName) {
      console.error("не указали новую точку");
      return;
    }

    const newPoint = {
      id: newId,
      name: newName,
      latitude: newLat,
      longitude: newLng,
      connections: [start.id, end.id],
    };

    const startPointIndex = points.findIndex((point) => point.id === start.id);
    const endPointIndex = points.findIndex((point) => point.id === end.id);

    if (startPointIndex === -1 || endPointIndex === -1) {
      console.error("Start or end point not found");
      return;
    }

    const updatedPoints = [...points, newPoint];

    updatedPoints[startPointIndex] = {
      ...updatedPoints[startPointIndex],
      connections: updatedPoints[startPointIndex].connections
        .filter((connId) => connId !== end.id)
        .concat(newPoint.id),
    };

    updatedPoints[endPointIndex] = {
      ...updatedPoints[endPointIndex],
      connections: updatedPoints[endPointIndex].connections
        .filter((connId) => connId !== start.id)
        .concat(newPoint.id),
    };

    setPoints(updatedPoints);
    updateLines();
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
        title={point.name || "Новая точка"}
      />
    ));
  };

  const GeodesicLine = ({ id, segments, start, end, distance }) => {
    const mapInstance = useMap();

    useEffect(() => {
      const lines = segments.map((segment) => {
        const line = L.polyline(segment, {
          color: "black",
          weight: 3,
          opacity: 0.7,
        }).addTo(mapInstance);

        line.on("mouseover", (e) => {
          const popup = L.popup()
            .setLatLng(e.latlng)
            .setContent(`Дистанция: ${distance.toFixed(2)} морских миль`)
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
    }, [mapInstance, segments, distance]);

    return null;
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
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
        whenCreated={handleMapLoad}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {renderMarkers(points)}
        {lines.map((line) => (
          <GeodesicLine
            key={line.id}
            id={line.id}
            segments={line.segments}
            start={line.start}
            end={line.end}
            distance={line.distance}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default SeaMap;
