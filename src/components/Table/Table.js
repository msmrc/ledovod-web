import React from 'react';
import styles from './Table.module.css';
import TableHeader from '../TableHeader/TableHeader';
import TableRow from '../TableRow/TableRow';

const Table = ({ headers, rows }) => {
  return (
    <div className={styles.tableContainer}>
      <TableHeader headers={headers} />
      {rows.map((row, index) => (
        <TableRow key={index} row={row} />
      ))}
    </div>
  );
};

export default Table;
