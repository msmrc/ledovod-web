import React, { useState } from "react";
import styles from "./GanttChart.module.css";
import Popup from "./Popup";

const Row = ({ item, datesArray, startPos, duration }) => {
  const [showPopup, setShowPopup] = useState(false);

  const onClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = (e) => {
    e.stopPropagation();
    setShowPopup(false);
  };
  return (
    <div className={styles.row}>
      <div className={`${styles.cell} ${styles.stickyColumn}`}>{item.name}</div>
      <div className={styles.cell}>{item.ship_type}</div>
      <div className={styles.cell}>
        {new Date(item.departure_time).toLocaleDateString("ru-RU")}
      </div>
      <div className={styles.cell}>
        {new Date(item.arrival_time).toLocaleDateString("ru-RU")}
      </div>
      {datesArray.map((_, idx) => (
       <div key={idx} className={styles.dateCell}>
       {idx >= startPos && idx < startPos + duration ? (
         <div
         onClick={onClick}
           className={styles.bar}
           style={{ left: `${startPos * 100}%`, width: `${duration * 100}%` }}
           data-item-id={item.ship_id}
         ></div>
       ) : null}
     </div>
      
      ))}
      {showPopup && <Popup info={item} onClose={handleClosePopup} />}
    </div>
  );
};

export default Row;
