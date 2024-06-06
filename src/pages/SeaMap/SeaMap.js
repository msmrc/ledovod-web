import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./SeaMap.module.css";

// Создание кастомной иконки для маркера
const customMarkerIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBDMjMuMjgzIDAgMzAgNi43MTcgMzAgMTVDMzAgMjMuMjgzIDIzLjI4MyAzMCAxNSAzMFMwIDIzLjI4MyAwIDE1QzAgNi43MTcgNi43MTcgMCAxNSAwWiIgZmlsbD0iIzAwRkZGRiIvPgo8L3N2Zz4K",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const initialPoints = [
  {
    id: 0,
    position: [73.1, 80.0],
    children: [43],
  },
  {
    id: 1,
    position: [69.4, 86.15],
    children: [],
  },
  {
    id: 2,
    position: [69.9, 44.6],
    children: [41, 5, 29, 64],
  },
  {
    id: 3,
    position: [69.15, 57.68],
    children: [],
  },
  {
    id: 4,
    position: [73, 44],
    children: [21, 36],
  },
  {
    id: 5,
    position: [71.5, 22],
    children: [],
  },
  {
    id: 6,
    position: [74.6, 63.9],
    children: [16, 7],
  },
  {
    id: 7,
    position: [76.4, 86.4],
    children: [16, 20],
  },
  {
    id: 8,
    position: [77.6, 107.7],
    children: [],
  },
  {
    id: 9,
    position: [74.9, 116.7],
    children: [24],
  },
  {
    id: 10,
    position: [73.1, 72.7],
    children: [11, 35, 25, 15, 16],
  },
  {
    id: 11,
    position: [68.5, 73.7],
    children: [],
  },
  {
    id: 12,
    position: [76.75, 116],
    children: [24, 42, 40],
  },
  {
    id: 13,
    position: [74, 76.7],
    children: [16, 0, 43],
  },
  {
    id: 14,
    position: [72.35, 79.6],
    children: [0],
  },
  {
    id: 15,
    position: [70.3, 57.8],
    children: [2, 3],
  },
  {
    id: 16,
    position: [77.3, 67.7],
    children: [34, 21],
  },
  {
    id: 17,
    position: [71.74, 184.7],
    children: [18, 28],
  },
  {
    id: 18,
    position: [70.7, 170.5],
    children: [26],
  },
  {
    id: 19,
    position: [77.8, 104.1],
    children: [20],
  },
  {
    id: 20,
    position: [77.7, 99.5],
    children: [],
  },
  {
    id: 21,
    position: [76.2, 58.3],
    children: [2],
  },
  {
    id: 22,
    position: [74.4, 139],
    children: [23],
  },
  {
    id: 23,
    position: [74.3, 146.7],
    children: [],
  },
  {
    id: 24,
    position: [74, 128.1],
    children: [],
  },
  {
    id: 25,
    position: [71.3, 72.15],
    children: [],
  },
  {
    id: 26,
    position: [69.1, 169.4],
    children: [],
  },
  {
    id: 27,
    position: [69.9, 179],
    children: [18, 45, 28],
  },
  {
    id: 28,
    position: [73.5, 169.9],
    children: [33],
  },
  {
    id: 29,
    position: [64.95, 40.05],
    children: [],
  },
  {
    id: 30,
    position: [75.9, 152.6],
    children: [18, 33],
  },
  {
    id: 31,
    position: [68.37, 54.6],
    children: [],
  },
  {
    id: 32,
    position: [73.7, 109.26],
    children: [],
  },
  {
    id: 33,
    position: [72, 159.5],
    children: [],
  },
  {
    id: 34,
    position: [72.4, 65.6],
    children: [13, 15],
  },
  {
    id: 35,
    position: [71, 73.73],
    children: [],
  },
  {
    id: 36,
    position: [76.5, 97.6],
    children: [19],
  },
  {
    id: 37,
    position: [64.2, 188.2],
    children: [38],
  },
  {
    id: 38,
    position: [60.7, 175.3],
    children: [],
  },
  {
    id: 39,
    position: [69.75, 169.9],
    children: [],
  },
  {
    id: 40,
    position: [75.5, 131.5],
    children: [22],
  },
  {
    id: 41,
    position: [69.5, 33.75],
    children: [],
  },
  {
    id: 42,
    position: [76.7, 140.8],
    children: [],
  },
  {
    id: 43,
    position: [74.8, 84.2],
    children: [],
  },
  {
    id: 44,
    position: [67.58, 47.82],
    children: [2],
  },
  {
    id: 45,
    position: [65.9, -169.35],
    children: [],
  },
  {
    id: 46,
    position: [55.7, 164.25],
    children: [],
  },
];

const SeaMap = () => {
  const [points, setPoints] = useState(initialPoints);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const newLines = [];
    //   const addLines = (point, pointsMap) => {
    //     point?.children.forEach((childId) => {
    //       const child = pointsMap[childId];
    //       newLines.push([point?.position, child?.position]);
    //       addLines(child, pointsMap);
    //     });
    //   };
    //   const pointsMap = Object.fromEntries(points.map((point) => [point.id, point]));
    //   points.forEach((point) => addLines(point, pointsMap));
    setLines(newLines);
  }, [points]);

  const handleDragEnd = (id, newPos) => {
    const updatePosition = (points, id, newPos) => {
      return points.map((point) => {
        if (point.id === id) {
          return { ...point, position: [newPos.lat, newPos.lng] };
        }
        return {
          ...point,
          children: updatePosition(point.children, id, newPos),
        };
      });
    };
    setPoints(updatePosition(points, id, newPos));
  };

  const handleLineClick = (e, line) => {
    const { lat, lng } = e.latlng;
    const newId = points.length ? Math.max(...points.map((p) => p.id)) + 1 : 1;
    const newPoint = { id: newId, position: [lat, lng], children: [] };

    const [startPos, endPos] = line;
    const updateTree = (points, startPos, endPos, newPoint) => {
      return points.map((point) => {
        if (
          point.position[0] === startPos[0] &&
          point.position[1] === startPos[1]
        ) {
          const childPoint = point.children.find(
            (child) =>
              points.find((p) => p.id === child).position[0] === endPos[0] &&
              points.find((p) => p.id === child).position[1] === endPos[1]
          );
          if (childPoint) {
            point.children = point.children.filter(
              (child) => child !== childPoint.id
            );
            point.children.push(newPoint.id);
            newPoint.children.push(childPoint.id);
          }
        } else if (point.children.length > 0) {
          point.children = updateTree(
            points.filter((p) => point.children.includes(p.id)),
            startPos,
            endPos,
            newPoint
          ).map((p) => p.id);
        }
        return point;
      });
    };

    setPoints(updateTree(points, startPos, endPos, newPoint));
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: () => {},
    });
    return null;
  };

  const renderMarkers = (points) => {
    return points.map((point) => (
      <React.Fragment key={point.id}>
        <Marker
          position={point.position}
          icon={customMarkerIcon}
          draggable={true}
          eventHandlers={{
            dragend: (event) =>
              handleDragEnd(point.id, event.target.getLatLng()),
          }}
        />
        {renderMarkers(points.filter((p) => point.children.includes(p.id)))}
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={[60, 0]} zoom={3} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {renderMarkers(points)}
        {lines.map((line, index) => (
          <Polyline
            key={index}
            positions={line}
            color="black"
            eventHandlers={{
              click: (e) => handleLineClick(e, line),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default SeaMap;
