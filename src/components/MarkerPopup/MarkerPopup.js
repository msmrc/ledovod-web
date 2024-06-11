import React from "react";
import { Marker, Popup } from "react-leaflet";
import styles from "./MarkerPopup.module.css";

const MarkerPopup = ({ point, handleDragEnd, handleDeletePoint, handleUpdatePointType, POINT_TYPES, getMarkerIcon }) => {
  return (
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
          <p className={styles.popupType}>Тип: {point.type || "Тип не указан"}</p>
          <button className={styles.popupButton} onClick={() => handleDeletePoint(point.id)}>Удалить точку</button>
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
  );
};

export default MarkerPopup;
