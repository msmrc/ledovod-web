import React from 'react';
import styles from './GanttChart.module.css';

const Header = ({ datesArray }) => (
    <div className={`${styles.header} ${styles.stickyRow}`}>
    <div className={`${styles.cell} ${styles.stickyColumn}`}>Корабль</div>
    <div className={styles.cell}>Тип</div>
    <div className={styles.cell}>Дата начала</div>
    <div className={styles.cell}>Дата окончания</div>
    {datesArray.map(date => (
      <div key={date} className={styles.dateCell}>{date.toLocaleDateString('ru-RU')}</div>
    ))}
  </div>
);

export default Header;
