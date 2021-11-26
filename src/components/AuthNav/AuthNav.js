import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="/register"
        exact
        className={s.link}
        activeClassName={s.activeLink}
      >
        registration
      </NavLink>
      <NavLink
        to="/login"
        exact
        className={s.link}
        activeClassName={s.activeLink}
      >
        login
      </NavLink>
    </div>
  );
}
