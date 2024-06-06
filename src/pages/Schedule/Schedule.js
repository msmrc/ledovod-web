import React, { useState } from "react";
import { Gantt, Task, EventOption } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import styles from "./Schedule.module.css";

export function initTasks() {
    const data = [
      {
        id: '1',
        name: 'Ледокол 1',
        start: new Date('2024-06-01'),
        end: new Date('2024-06-30'),
        type: 'project',
        hideChildren: false,
        progress: 100,
        displayOrder: 1,
        tasks: [
          {
            id: '1-1-1',
            name: 'Корабль 1',
            start: new Date('2024-06-01'),
            end: new Date('2024-06-10'),
            type: 'task',
            progress: 100,
            displayOrder: 2,
          },
          {
            id: '1-1-2',
            name: 'Корабль 2',
            start: new Date('2024-06-05'),
            end: new Date('2024-06-15'),
            type: 'task',
            progress: 100,
            displayOrder: 3,
          },
          {
            id: '1-1-3',
            name: 'Корабль 2',
            start: new Date('2024-06-05'),
            end: new Date('2024-06-15'),
            type: 'task',
            progress: 100,
            displayOrder: 4,
          },
        ],
      },
    ];
    return data;
  }
  
  const Schedule = () => {
    const [timeFrame, setTimeFrame] = useState('1 month');
    const [tasks, setTasks] = useState(initTasks());
  
    const toggleTaskExpansion = (task) => {
      task.hideChildren = !task.hideChildren;
      if (task.tasks) {
        task.tasks.forEach(toggleTaskExpansion);
      }
    };
  
    const handleExpanderClick = (task) => {
      const newTasks = tasks.map(t => {
        if (t.id === task.id) {
          const updatedTask = { ...t };
          toggleTaskExpansion(updatedTask);
          return updatedTask;
        }
        return t;
      });
      setTasks([...newTasks]);
    };
  
    const handleTimeFrameChange = (e) => {
      setTimeFrame(e.target.value);
    };
  
    // Flatten the tasks structure for the Gantt component
    const flattenTasks = (tasks) => {
      const result = [];
      const flatten = (task) => {
        result.push(task);
        if (task.tasks && !task.hideChildren) {
          task.tasks.forEach(flatten);
        }
      };
      tasks.forEach(flatten);
      return result;
    };

    const columns = [
        { name: "name", label: "Название", width: 150 },
        { name: "start", label: "Начало", width: 100 },
        { name: "end", label: "Конец", width: 100 },
        { name: "progress", label: "Прогресс", width: 100 }
      ];

    return (
      <div className={styles.scheduleContainer}>
        <div className={styles.controls}>
          <label htmlFor="timeFrame">Временной промежуток: </label>
          <select id="timeFrame" value={timeFrame} onChange={handleTimeFrameChange}>
            <option value="1 month">1 месяц</option>
            <option value="3 months">3 месяца</option>
            {/* <option value="6 months">6 месяцев</option> */}
          </select>
        </div>
        <Gantt
          tasks={flattenTasks(tasks)}
          onExpanderClick={handleExpanderClick}
          viewMode={
            timeFrame === '1 month'
              ? 'Day'
              : timeFrame === '3 months'
                ? 'Month'
                : 'Quarter'
          }
          locale="ru"
          barFill={100}
        />
      </div>
    );
  };
  
  export default Schedule;