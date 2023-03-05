import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()

  const uponLogout = async (e) => {
    if (location.pathname.includes("likes")) {
        history.push("/")
    }
    await dispatch(logout());
  };

  return <button style={{ background: "none", border: "none", color: "gray", cursor: "pointer" }} onClick={uponLogout}>Log out</button>;
};

export default LogoutButton;
