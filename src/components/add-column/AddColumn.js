import React, { useState } from 'react';
import { Modal } from '../../shared/Modal';
import classes from './AddColumn.module.css';
import commonStyles from '../../shared/styles/styles.module.css';

export const AddColumn = ({ handleAdd, handleClose }) => {
  const [columnName, setColumnName] = useState('');

  function handleAddCloumn() {
    if (!columnName) {
      return alert('Enter a column name');
    }

    handleAdd(columnName);
  }

  return (
    <Modal>
      <div className={classes.modalHead}>
        <div>Add Column</div>
        <div className={classes.close} onClick={handleClose}>
          &times;
        </div>
      </div>
      <div className={classes.modalBody}>
        <div className={classes.field}>
          <label htmlFor="column_name">Enter a Column Name:</label>
          <input
            type="text"
            value={columnName}
            name="column_name"
            id="column_name"
            onChange={(e) => setColumnName(e.target.value)}
          />
        </div>
        <div className={classes.action}>
          <button
            id="CreateColumn"
            onClick={handleAddCloumn}
            className={commonStyles.info}
          >
            Add Column
          </button>
        </div>
      </div>
    </Modal>
  );
};
