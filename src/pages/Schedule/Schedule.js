import React, { useEffect, useState } from "react";
import "gantt-task-react/dist/index.css";
import styles from "./Schedule.module.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import axios from "axios";
import { API_URL } from "../../api/config";
import GanttChart from "../../components/GanttChart/GanttChart";
import data from "../../data/data_with_types.json";
import SeaMap from "../SeaMap/SeaMap";

const Schedule = () => {
  const [points, setPoints] = useState(data);
  const [activeTab, setActiveTab] = useState("diagram");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const shipsData = [
    {
        name: "Вайгач",
        id: 4,
        ship_type: "icebreaker",
        travel_type: "self",
        initial_position: 6,
        final_position: 6,
        departure_time: "01-03-22 00:00",
        arrival_time: "28-02-22 14:00"
    },
    {
        name: "Вайгач",
        id: 4,
        ship_type: "icebreaker",
        travel_type: "with ship",
        initial_position: 11,
        final_position: 41,
        departure_time: "01-03-22 00:00",
        arrival_time: "05-03-22 15:00"
    },
    {
        name: "Ямал",
        id: 2,
        ship_type: "icebreaker",
        travel_type: "self",
        initial_position: 41,
        final_position: 41,
        departure_time: "02-03-22 00:00",
        arrival_time: "28-02-22 20:00"
    }
  ]

  const mapShipPositions = (shipsData, points) => {
    return shipsData.map(ship => {
      const initialPositionName = points.find(point => point.id === ship.initial_position)?.name || '';
      const finalPositionName = points.find(point => point.id === ship.final_position)?.name || '';
  
      return {
        ...ship,
        initialPositionName,
        finalPositionName
      };
    });
  };
  
  useEffect(() => {
    // const updatedShipsData = mapShipPositions(shipsData, points);
    // console.log(updatedShipsData)
    // setTasks(updatedShipsData);
    // setLoading(false);
    axios
      .get(`${API_URL}/get_easy_ghantt`)
      .then((response) => {
        const scheduleData = response.data;
        const updatedShipsData = mapShipPositions(scheduleData, points);
        console.log(updatedShipsData)
        setTasks(updatedShipsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setLoading(false);
      });
  }, [points]);

  const tabs = [
    { name: "Диаграмма", val: "diagram" },
    { name: "Карта *в разработке", val: "map" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.val);
  };


  return (
    <div>
      <PageHeader
        title="Расписание"
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loader}>Загрузка...</div>
        ) : (
          //
          <div>
            {activeTab === "diagram" ? (
              <GanttChart
                data={tasks}
                startDate="2022-01-01"
                endDate="2022-09-01"
              />
            ) : (
              <SeaMap />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
