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
      <div className={`${styles.cell} ${styles.stickyColumn}`}>{item.ship}</div>
      <div className={styles.cell}>{item.type}</div>
      <div className={styles.cell}>{new Date(item.startDate).toLocaleDateString('ru-RU')}</div>
      <div className={styles.cell}>{new Date(item.endDate).toLocaleDateString('ru-RU')}</div>
      {datesArray.map((_, idx) => (
        <div key={idx} className={styles.dateCell}>
          {idx === startPos ? (
            <div
            onClick={onClick}
              className={styles.bar}
              style={{ '--duration': duration }}
              data-item-id={item.id}
            ></div>
          ) : null}
        </div>
      ))}
       {showPopup && (
        <Popup info={item} onClose={handleClosePopup} />
      )}
    </div>
  )};
  
  export default Row;
  