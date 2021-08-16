import React, { useEffect, useState, useContext } from 'react';
import classes from './Home.module.css';
import commonStyles from '../../shared/styles/styles.module.css';
import { Link } from 'react-router-dom';
import { getBoards } from '../../firebase-db';
import { Alert } from '../../shared/Alert';
import { Loader } from '../../shared/Loader';
import { AuthContext } from '../../context/Auth';

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards(currentUser.email)
      .then((boards) => {
        setBoards(boards);
        setLoading(false);
      })
      .catch(() => {
        setBoards([]);
      });
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          <h2 className={commonStyles.title}>Boards</h2>
          {boards.length === 0 && (
            <Alert type="info" isClosable={false}>
              You haven't created any boards. You can click on the 'Create a
              Board' button in the navigation bar to create a board.
            </Alert>
          )}
          <div className={classes.boards}>
            {boards.map((board) => {
              return (
                <Link
                  to={'/board/' + board.id}
                  className={classes.board}
                  key={board.id}
                >
                  <div className={classes.boardName}>{board.name}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
