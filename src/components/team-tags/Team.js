import React from 'react';
import classes from './Team.module.css';

export const Team = ({ name }) => {
  const arr = name.split(' ');
  let abbr = '';
  arr.forEach((element) => {
    abbr += element.charAt(0);
  });
  return <div className={classes.circle}>{abbr}</div>;
};
