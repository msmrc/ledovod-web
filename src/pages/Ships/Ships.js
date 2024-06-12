import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import Table from '../../components/Table/Table';
import { useNavigate } from 'react-router-dom';

const Ships = () => {
  const navigate = useNavigate();
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
    navigate('/dashboard/ships/create');
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
