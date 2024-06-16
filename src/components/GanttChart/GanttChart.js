import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";
import Row from "./Row";
import styles from "./GanttChart.module.css";
import { getDatesArray, calculatePosition } from "./utils";

const GanttChart = ({ data, startDate, endDate }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const datesArray = getDatesArray(new Date(startDate), new Date(endDate));

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUpDocument = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUpDocument);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUpDocument);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div
      className={`${styles.ganttChartContainer} ${
        isDragging ? styles.noSelect : ""
      }`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.ganttChart}>
        <Header datesArray={datesArray} />
        {data.map((item, index) => {
          const { startPos, endPos, duration } = calculatePosition(
            item.departure_time,
            item.arrival_time,
            datesArray
          );
          return (
            <Row
              key={index}
              item={item}
              datesArray={datesArray}
              startPos={startPos}
              endPos={endPos}
              duration={duration}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GanttChart;
