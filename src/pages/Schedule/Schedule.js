import React, { useEffect, useState } from "react";
import "gantt-task-react/dist/index.css";
import styles from "./Schedule.module.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import axios from "axios";
import { API_URL } from "../../api/config";
import GanttChart from "../../components/GanttChart/GanttChart";
import SeaMap from "../SeaMap/SeaMap";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("diagram");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/generate_default_schedule`)
      .then((response) => {
        const scheduleData = response.data.icebreaker_schedule.map(
          (item, index) => ({
            id: `icebreaker-${item.icebreaker_id}`,
            name: `${item.icebreaker_name} - ${item.ship_name}`,
            start: new Date(item.start_time),
            end: new Date(item.end_time),
            progress: 100,
            hideChildren: true,
            tasks: item.path.map((pathItem, pathIndex) => ({
              id: `path-${index}-${pathIndex}`,
              name: `Path from ${pathItem.from} to ${pathItem.to}`,
              start: new Date(item.start_time),
              end: new Date(item.end_time),
              progress: 100,
            })),
          })
        );
        setTasks(scheduleData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setLoading(false);
      });
  }, []);

  const tabs = [
    { name: "Диаграмма", val: "diagram" },
    { name: "Карта *в разработке", val: "map" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.val);
  };

  const data = [
    {
      ship: "Ship A",
      type: "Icebreaker",
      startDate: "2024-06-01",
      endDate: "2024-06-10",
    },
    {
      ship: "Ship B",
      type: "Cargo",
      startDate: "2024-06-05",
      endDate: "2024-06-15",
    },
    {
      ship: "Ship C",
      type: "Tanker",
      startDate: "2024-06-07",
      endDate: "2024-06-12",
    },
    {
      ship: "Ship C",
      type: "Tanker",
      startDate: "2024-06-07",
      endDate: "2024-06-12",
    },
  ];
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
                data={data}
                startDate="2024-06-01"
                endDate="2024-08-20"
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
