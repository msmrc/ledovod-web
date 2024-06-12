import React, { useState } from "react";
import styles from "./Requests.module.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Активные");

  const headers = [
    "Название судна",
    "Дата/время отбытия",
    "Точка отбытия",
    "Дата/время прибытия",
    "Точка прибытия",
    "Статус",
  ];

  const rows = [
    [
      "Дюк II",
      "03.04.2020, 11:30",
      "г. Владивосток",
      "09.04.2020, 01:30",
      "г. Архангельск",
      "Активная",
    ],
    [
      "Дюк II",
      "03.04.2020, 11:30",
      "г. Владивосток",
      "09.04.2020, 01:30",
      "г. Архангельск",
      "Активная",
    ],
    [
      "Дюк II",
      "03.04.2020, 11:30",
      "г. Владивосток",
      "09.04.2020, 01:30",
      "г. Архангельск",
      "Активная",
    ],
    [
      "Дюк II",
      "03.04.2020, 11:30",
      "г. Владивосток",
      "09.04.2020, 01:30",
      "г. Архангельск",
      "Активная",
    ],
  ];

  const tabs = [
    { name: "Активные", count: 12 },
    { name: "Прошедшие", count: 12 },
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddButtonClick = () => {
    navigate('/dashboard/requests/create');
  };

  return (
    <div>
      <PageHeader
        title="Заявки"
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onAddButtonClick={handleAddButtonClick}
      />
      <div>
        <Table headers={headers} rows={rows} />
      </div>
    </div>
  );
};

export default Requests;
