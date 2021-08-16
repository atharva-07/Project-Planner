import React, { useState, useContext } from 'react';
import commonStyles from '../../shared/styles/styles.module.css';
import classes from './AddBoard.module.css';
import { addBoard } from '../../firebase-db';
import { Alert } from '../../shared/Alert';
import { AuthContext } from '../../context/Auth';

export const AddBoard = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const saveBoard = () => {
    if (!name && !teamMember) {
      return setError('Name and Team Members are required fields');
    }

    const teamMembers = teamMember.split(',').map((el) => el.trim());

    const newBoard = {
      user: currentUser.email,
      name,
      teamMembers,
      type
    };

    addBoard(newBoard)
      .then((created) => {
        if (created) {
          history.push('/');
        } else {
          setError('Could not add Board');
        }
      })
      .catch((err) => {
        setError('Could not add Board. Some error occured.');
      });
  };

  function handleClose(isClose) {
    if (isClose) {
      setError('');
    }
  }

  return (
    <div className={classes.container}>
      {error && (
        <Alert canClose={handleClose} type={'error'}>
          {error}
        </Alert>
      )}
      <h2 className={commonStyles.title}>Create a board</h2>
      <div className={classes.field}>
        <label htmlFor="name">Enter a name for your board</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Enter your project name"
        />
      </div>
      <div className={classes.field}>
        <label htmlFor="team">Add your Team members</label>
        <input
          type="text"
          name="team"
          id="team"
          value={teamMember}
          onChange={(e) => setTeamMember(e.target.value)}
          placeholder="Add your team members (separated by commas)"
        />
      </div>
      <div className={classes.field}>
        <label htmlFor="type">Enter the type for your board</label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="eg. Frontend Development"
        />
      </div>
      <div className={classes.field}>
        <button
          type="submit"
          onClick={saveBoard}
          className={commonStyles.info}
          id="CreateBoard"
        >
          Create
        </button>
      </div>
    </div>
  );
};
