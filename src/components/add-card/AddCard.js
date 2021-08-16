import React, { useState, useEffect } from 'react';
import { Modal } from '../../shared/Modal';
import classes from './AddCard.module.css';
import commonStyles from '../../shared/styles/styles.module.css';
import { Alert } from '../../shared/Alert';
import Select from 'react-select';

export const AddCard = ({
  board,
  handleCardAdd,
  handleClose,
  card,
  isAdd = true,
  handleEdit
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);

      const selectedTeam = convertTeam(card.teamMembers);
      setTeam(selectedTeam);

      const date = new Date(card.date);
      setDueDate(date.toISOString().substr(0, 10));
    }
  }, [isAdd, card]);

  useEffect(() => {
    const team = convertTeam(board.teamMembers);

    setTeamMembers(team);
  }, [board]);

  function onSelectChange(selectedOptions) {
    setTeam(selectedOptions);
  }

  function onSave() {
    if (!title || !description || !dueDate || team.length === 0) {
      setError('All the fields are required');
      return;
    }

    const checkDateBool = checkDate(dueDate);

    if (checkDateBool) {
      setError('Cannot select a past date.');
      return;
    }

    setError(null);
    const selectedTeam = team.map((opt) => opt.value);
    const card = createCard(dueDate, title, selectedTeam, description);

    if (isAdd) {
      handleCardAdd(card);
    } else {
      handleEdit(card);
    }
  }

  return (
    <Modal>
      <div className={classes.modalHead}>
        <div>{isAdd ? 'Add Card' : 'Edit Card'}</div>
        <div className={classes.close} onClick={handleClose}>
          &times;
        </div>
      </div>
      {error && (
        <Alert
          children={error}
          type={'error'}
          canClose={() => setError(null)}
        />
      )}
      <div className={classes.modalBody}>
        <div className={classes.formField}>
          <label htmlFor="title">Enter the title for your task</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="eg. Add a new Icon"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={classes.formRow}>
          <div className={classes.formField}>
            <label htmlFor="title">Choose members for this task</label>
            <Select
              options={teamMembers}
              isMulti
              closeMenuOnSelect={false}
              onChange={onSelectChange}
              value={team}
            />
          </div>
          <div className={classes.formField}>
            <label htmlFor="title">Select the due date for this task</label>
            <input
              type="date"
              name="title"
              id="due_date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.formField}>
          <label htmlFor="title">Add the descriptions for your task</label>
          <textarea
            name="description"
            id="description"
            placeholder="Add your description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <small className={classes.formInfo}>
            <svg
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
              className={classes.markIcon}
            ></svg>
          </small>
        </div>

        <div className={classes.formField}>
          <button
            className={commonStyles.info}
            id="CreateCard"
            onClick={onSave}
          >
            {isAdd ? 'Add Card' : 'Edit Card'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

function checkDate(dueDate) {
  const today = new Date().getTime();
  const dueDateMili = new Date(dueDate).getTime();

  if (dueDateMili < today) {
    return true;
  }

  return false;
}

function createCard(dueDate, title, teamMembers, description) {
  const date = new Date(dueDate).getTime();
  return {
    title,
    description,
    teamMembers,
    date,
    isArchive: false
  };
}

function convertTeam(memebers) {
  return memebers.map((member) => ({
    label: member,
    value: member
  }));
}
