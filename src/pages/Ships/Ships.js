import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import Table from '../../components/Table/Table';

const Ships = () => {
  const headers = [
    "Название судна",
    "Ледовый класс",
    "Скорость, узлы (по чистой воде)",
  ];

  const rows = [
    [
      "Тикси",
      "Arc 5",
      "15",
    ],
    [
      "Тикси",
      "Arc 5",
      "15",
    ],
    [
      "Тикси",
      "Arc 5",
      "15",
    ],
    [
      "Тикси",
      "Arc 5",
      "15",
    ],
  ];

  const handleAddButtonClick = () => {
    console.log("Add button clicked");
  };

  return (
    <div>
      <PageHeader
        title="Корабли"
        onAddButtonClick={handleAddButtonClick}
      />
      <div>
        <Table headers={headers} rows={rows} />
      </div>
    </div>
  );
};

export default Ships;
