import React, { useState } from 'react';
import classes from './Card.module.css';
import commonStyles from '../../shared/styles/styles.module.css';
import { Team } from '../team-tags/Team';
import { Modal } from '../../shared/Modal';
import { convertDateToNice } from '../../utility/date-helper';
import ReactMarkdown from 'react-markdown';

export const Card = ({ card, board, hanldeEdit, hanldeArchive, column }) => {
  const [isDetails, setIsDetails] = useState(false);
  const members = card.teamMembers.map((name) => (
    <Team name={name} key={name} />
  ));
  const date = new Date(card.date);
  const dueDate = convertDateToNice(date);

  function doEdit() {
    setIsDetails(false);
    hanldeEdit();
  }

  function doArchive() {
    setIsDetails(false);
    hanldeArchive();
  }

  const detailsModal = (
    <Modal>
      <div className={classes.modalHeader}>
        <div className={classes.title}>
          {card.title}
          <div className={classes.meta}>
            in <span>{board.name}</span>
          </div>
        </div>
        <div className={classes.btnGroup}>
          <button className={commonStyles.info} onClick={doEdit}>
            Edit
          </button>
          <button className={commonStyles.danger} onClick={doArchive}>
            Archive
          </button>
        </div>
        <div className={classes.modalClose} onClick={() => setIsDetails(false)}>
          &times;
        </div>
      </div>
      <div className={classes.modalBody}>
        <div className={classes.bodyRow}>
          <div className={classes.det}>
            <header>Assignee(s)</header>
            <div className={classes.detTeam}>{members}</div>
          </div>
          <div className={classes.det}>
            <header>Due Date</header>
            <div>{dueDate}</div>
          </div>
        </div>
        <div className={classes.md}>
          <ReactMarkdown source={card.description} className="markdown" />
        </div>
      </div>
    </Modal>
  );

  function dragStart(ev, card) {
    ev.dataTransfer.setData('card', JSON.stringify(card));
    ev.dataTransfer.setData('columnFrom', JSON.stringify(column));
  }

  return (
    <>
      <li
        className={classes.item}
        onDragStart={(e) => dragStart(e, card)}
        draggable
        onClick={() => setIsDetails(true)}
      >
        <div className={classes.text}>{card.title}</div>
        <div className={classes.actions}>
          <div className={classes.actionBtn}>
            <i
              className="material-icons"
              style={{ fontSize: '30px', cursor: 'move' }}
            >
              list
            </i>
          </div>
          <div className={classes.team}>{members}</div>
        </div>
      </li>
      {isDetails && detailsModal}
    </>
  );
};
