import React from 'react';
import styles from './GanttChart.module.css';

const Row = ({ item, datesArray, startPos, duration }) => (
  <div className={styles.row}>
    <div className={`${styles.cell} ${styles.stickyColumn}`}>{item.ship}</div>
    <div className={styles.cell}>{item.type}</div>
    <div className={styles.cell}>{new Date(item.startDate).toLocaleDateString('ru-RU')}</div>
    <div className={styles.cell}>{new Date(item.endDate).toLocaleDateString('ru-RU')}</div>
    {datesArray.map((_, idx) => (
            <div key={idx} className={styles.dateCell}>
            {idx === startPos ? (
            <div className={styles.bar} style={{ '--duration': duration }}></div>
            ) : null}
            </div>
    ))}
  </div>
);

export default Row;
