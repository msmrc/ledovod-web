import React, { useState } from 'react';
import Table from '../../components/Table/Table';
import PageHeader from '../../components/PageHeader/PageHeader';

const Icebreakers = () => {
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
        title="Ледоколы"
        onAddButtonClick={handleAddButtonClick}
      />
      <div>
        <Table headers={headers} rows={rows} />
      </div>
    </div>
  );
};

export default Icebreakers;
