import React from 'react';
import { NavLink } from 'react-router-dom';
import { ImAddressBook } from 'react-icons/im';
import { useSelector } from "react-redux";
import { authSelectors } from '../redux/auth/auth-selectors';

const styles = {
  container: {
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
  },
  icon: {
    fontSize: 48,
    color: '#617a53',
  },
  note: {
    fontSize: 16,
    color: '#617a53',
  }
};

export default function HomeView() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const name = useSelector(authSelectors.getUsername);
  return (
    <div style={styles.container}>
      <ImAddressBook style={styles.icon}/>
      <h1 style={styles.title}>
        welcome to phone book service 
      </h1>
      {isLoggedIn?
        <span style={styles.note}>
          <b>{name}</b>, you can get your <b><NavLink to="/contacts" exact>contacts</NavLink></b>
        </span> :
        <span style={styles.note}>
          <b><NavLink to="/register" exact>register</NavLink></b> or <b><NavLink to="/login" exact>log in</NavLink></b> to use our service
        </span>
    }
    </div>
  )
};
