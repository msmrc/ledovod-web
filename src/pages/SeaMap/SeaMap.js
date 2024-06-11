import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./SeaMap.module.css";
// import data from "../../data/initial_points.json";
import data from "../../data/data_with_types.json";
import GeodesicLine from "../../components/GeodesicLine";
import IcePolygon from "../../components/IcePolygon";
import MarkerPopup from "../../components/MarkerPopup/MarkerPopup";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { calculateGeodesicSegments } from "../../utils/calculateGeodesicSegments";
import { calculateDistance } from "../../utils/calculateDistance";

const POINT_TYPES = ["Порт", "Контрольная точка"];

// Создание кастомной иконки для маркера
const customMarkerIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBDMjMuMjgzIDAgMzAgNi43MTcgMzAgMTVDMzAgMjMuMjgzIDIzLjI4MyAzMCAxNSAzMFMwIDIzLjI4MyAwIDE1QzAgNi43MTcgNi43MTcgMCAxNSAwWiIgZmlsbD0iIzAwRkZGRiIvPgo8L3N2Zz4K",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const portIcon = new L.Icon({
  iconUrl: require("../../data/images/port.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const checkpointIcon = new L.Icon({
  iconUrl: require("../../data/images/checkpoint.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const initialIcePolygons = [
  {
    id: generateUniqueId(),
    coordinates: [
      [69.0, 32.5],
      [69.5, 33.0],
      [69.2, 33.5],
      [69.9, 35.5],
    ],
    passability: "high",
  },
  {
    id: generateUniqueId(),
    coordinates: [
      [75.0, 55.0],
      [75.5, 56.0],
      [75.2, 56.5],
      [77.0, 55.0],
    ],
    passability: "medium",
  },
  {
    id: generateUniqueId(),
    coordinates: [
      [79.5, 101.0],
      [80.0, 102.0],
      [79.7, 102.5],
      [80.5, 101.0],
    ],
    passability: "low",
  },
  {
    id: generateUniqueId(),
    coordinates: [
      [75.1, 147.0],
      [75.6, 148.0],
      [75.3, 148.5],
      [76.1, 147.0],
    ],
    passability: "medium",
  },
  {
    id: generateUniqueId(),
    coordinates: [
      [64.5, 40.5],
      [65.0, 41.0],
      [64.7, 41.5],
      [65.5, 40.5],
    ],
    passability: "low",
  },
  {
    id: generateUniqueId(),
    coordinates: [
      [72.5, 52.0],
      [73.0, 52.5],
      [72.7, 53.0],
      [73.5, 52.0],
    ],
    passability: "high",
  },
  {
    id: generateUniqueId(),
    coordinates: [
      [70.0, 130.0],
      [70.5, 131.0],
      [70.2, 131.5],
      [72.0, 130.0],
    ],
    passability: "medium",
  },
  {
    id: generateUniqueId(),
    coordinates: [
      [76.0, 140.0],
      [76.5, 141.0],
      [76.2, 141.5],
      [79.0, 140.0],
    ],
    passability: "low",
  },
];

const SeaMap = () => {
  const [points, setPoints] = useState(data);
  const [lines, setLines] = useState([]);
  const [map, setMap] = useState(null);
  const [showIceLayer, setShowIceLayer] = useState(false);
  const [icePolygons, setIcePolygons] = useState(initialIcePolygons);

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
      console.error("Введите название точки");
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
      console.error("Точка не найдена");
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

  const getMarkerIcon = (type) => {
    switch (type) {
      case "Порт":
        return portIcon;
      case "Контрольная точка":
        return checkpointIcon;
      default:
        return customMarkerIcon;
    }
  };

  const handleUpdatePointType = (id, newType) => {
    const updatedPoints = points.map((point) =>
      point.id === id ? { ...point, type: newType } : point
    );
    setPoints(updatedPoints);
  };

  const renderMarkers = (points) => {
    return points.map((point) => (
      <MarkerPopup
        key={point.id}
        point={point}
        handleDragEnd={handleDragEnd}
        handleDeletePoint={handleDeletePoint}
        handleUpdatePointType={handleUpdatePointType}
        POINT_TYPES={POINT_TYPES}
        getMarkerIcon={getMarkerIcon}
      />
    ));
  };

  const handleDeletePoint = (id) => {
    const pointToDelete = points.find((point) => point.id === id);
    if (!pointToDelete) {
      console.error("Точка не найдена");
      return;
    }

    const { connections } = pointToDelete;

    const updatedPoints = points.filter((point) => point.id !== id);
    updatedPoints.forEach((point) => {
      point.connections = point.connections.filter((connId) => connId !== id);
    });

    if (connections.length === 2) {
      const [conn1, conn2] = connections;
      const conn1Index = updatedPoints.findIndex((point) => point.id === conn1);
      const conn2Index = updatedPoints.findIndex((point) => point.id === conn2);

      if (conn1Index !== -1 && conn2Index !== -1) {
        updatedPoints[conn1Index] = {
          ...updatedPoints[conn1Index],
          connections: [...updatedPoints[conn1Index].connections, conn2],
        };

        updatedPoints[conn2Index] = {
          ...updatedPoints[conn2Index],
          connections: [...updatedPoints[conn2Index].connections, conn1],
        };
      }
    }

    setPoints(updatedPoints);
    updateLines();
  };

  const handleIceLayerToggle = () => {
    setShowIceLayer(!showIceLayer);
  };

  const handleIcePolygonChange = (e, id) => {
    const updatedPolygons = icePolygons.map((polygon) =>
      polygon.id === id
        ? { ...polygon, coordinates: e.target.getLatLngs()[0] }
        : polygon
    );
    setIcePolygons(updatedPolygons);
  };

  const handlePassabilityChange = (id, newPassability) => {
    const updatedPolygons = icePolygons.map((polygon) =>
      polygon.id === id ? { ...polygon, passability: newPassability } : polygon
    );
    setIcePolygons(updatedPolygons);
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    mapInstance.on("editable:vertex:dragend", (e) =>
      handleIcePolygonChange(e, e.layer._leaflet_id)
    );
    mapInstance.on("editable:vertex:new", (e) =>
      handleIcePolygonChange(e, e.layer._leaflet_id)
    );
    mapInstance.on("editable:vertex:deleted", (e) =>
      handleIcePolygonChange(e, e.layer._leaflet_id)
    );
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.controlPanel}>
        <label>
          <input
            type="checkbox"
            checked={showIceLayer}
            onChange={handleIceLayerToggle}
          />
          Показать слой льда
        </label>
        <button className={styles.saveButton} onClick={handleSave}>
          Сохранить
        </button>
      </div>
      <MapContainer
        center={[65, -15]}
        zoom={3}
        className={styles.map}
        worldCopyJump={true}
        whenCreated={handleMapLoad}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {showIceLayer &&
          icePolygons.map((polygon) => (
            <IcePolygon
              key={polygon.id}
              polygon={polygon}
              handleIcePolygonChange={handleIcePolygonChange}
              handlePassabilityChange={handlePassabilityChange}
            />
          ))}
        {renderMarkers(points)}
        {lines.map((line) => (
          <GeodesicLine
            key={line.id}
            id={line.id}
            segments={line.segments}
            start={line.start}
            end={line.end}
            distance={line.distance}
            handleLineClick={handleLineClick}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default SeaMap;
