import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import { AuthContext } from '../../context/Auth';
import { firebaseApp } from '../../firebase-init';

export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [isDropdown, setIsDropdown] = useState(false);
  function toggleDropdown() {
    setIsDropdown(!isDropdown);
  }

  async function handleLogout() {
    await firebaseApp.auth().signOut();
    setIsDropdown(false);
  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.brand}>
          <NavLink to="/">Project Planner</NavLink>
        </div>
        <ul className={classes.menu}>
          {currentUser ? (
            <>
              <li>
                <NavLink exact activeClassName={classes.activeLink} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/createboard" activeClassName={classes.activeLink}>
                  Create a board
                </NavLink>
              </li>
              <li className={classes.dropdown} onClick={toggleDropdown}>
                {currentUser.displayName.split(' ')[0]}
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink activeClassName={classes.activeLink} to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName={classes.activeLink} to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {isDropdown && (
          <div className={classes.dropdownMenu}>
            <div className={classes.dropdownItem} onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
