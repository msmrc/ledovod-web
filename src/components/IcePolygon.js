import React from "react";
import { Polygon, Popup } from "react-leaflet";

const getPassabilityDescription = (passability) => {
  switch (passability) {
    case "high":
      return "высокая";
    case "medium":
      return "средняя";
    case "low":
      return "низкая";
    default:
      return passability;
  }
};

const IcePolygon = ({ polygon, handleIcePolygonChange, handlePassabilityChange }) => {
  return (
    <Polygon
      key={polygon.id}
      positions={polygon.coordinates}
      color={
        polygon.passability === "high"
          ? "blue"
          : polygon.passability === "medium"
          ? "yellow"
          : "red"
      }
      fillOpacity={0.3}
      editable={true}
      eventHandlers={{
        edit: (e) => handleIcePolygonChange(e, polygon.id),
      }}
    >
      <Popup>
        <div>
          <h3>Лед</h3>
          <p>Проходимость: {getPassabilityDescription(polygon.passability)}</p>
        </div>
      </Popup>
    </Polygon>
  );
};

export default IcePolygon;
