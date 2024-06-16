import styles from "./GanttChart.module.css";

const Popup = ({ info, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2>Информация о судне</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.popupContent}>
          <p>
            <strong>Корабль:</strong> {info.name}
          </p>
          <p>
            <strong>Тип:</strong> {info.ship_type}
          </p>
          <p>
            <strong>Дата начала:</strong>{" "}
            {new Date(info.departure_time).toLocaleDateString("ru-RU")}
          </p>
          <p>
            <strong>Дата окончания:</strong>{" "}
            {new Date(info.arrival_time).toLocaleDateString("ru-RU")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
