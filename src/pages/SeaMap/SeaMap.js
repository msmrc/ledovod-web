import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./SeaMap.module.css";
// import data from "../../data/initial_points.json";
import data from "../../data/data_with_types.json";
import {
  calculateDistance,
  calculateGeodesicSegments,
  generateUniqueId,
} from "./seaUtils";

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

const initialIcePolygon = [
  [65, -20],
  [65, -10],
  [70, -10],
  [70, -20],
  [65, -20],
];

const SeaMap = () => {
  const [points, setPoints] = useState(data);
  const [lines, setLines] = useState([]);
  const [map, setMap] = useState(null);
  const [showIceLayer, setShowIceLayer] = useState(false);
  const [icePolygon, setIcePolygon] = useState(initialIcePolygon);

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
      <Marker
        key={point.id}
        position={[point.latitude, point.longitude]}
        icon={getMarkerIcon(point.type)}
        draggable={true}
        eventHandlers={{
          dragend: (event) => handleDragEnd(point.id, event.target.getLatLng()),
        }}
        title={`${point.name || "Новая точка"}: (${point.type || "Тип"})`}
      >
        <Popup>
          <div className={styles.popupContent}>
            <h3 className={styles.popupTitle}>{point.name || "Новая точка"}</h3>
            <p className={styles.popupType}>
              Type: {point.type || "Тип не указан"}
            </p>
            <button
              className={styles.popupButton}
              onClick={() => handleDeletePoint(point.id)}
            >
              Удалить точку
            </button>
            <select
              className={styles.popupSelect}
              value={point.type}
              onChange={(e) => handleUpdatePointType(point.id, e.target.value)}
            >
              {POINT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </Popup>
      </Marker>
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
    }, [mapInstance, segments, distance]);

    return null;
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

  const handleIcePolygon = (e) => {
    setIcePolygon(e.target.getLatLngs()[0]);
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    mapInstance.on("editable:vertex:dragend", handleIcePolygon);
    mapInstance.on("editable:vertex:new", handleIcePolygon);
    mapInstance.on("editable:vertex:deleted", handleIcePolygon);
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
        {showIceLayer && (
          <Polygon
            positions={icePolygon}
            color="blue"
            fillOpacity={0.3}
            editable={true}
          />
        )}
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
