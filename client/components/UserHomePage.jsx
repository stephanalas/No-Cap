import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import PersonIcon from '@material-ui/icons/Person';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import './styles/UserHomePage.css';

import DeleteUser from './DeleteUser';
import UserProfile from './UserProfile';
import Admin from './Admin';

export default () => {
  const [selected, setSelected] = useState('Edit Profile');
  const userRole = useSelector((state) => state.user.role);

  const [isAdmin, _] = useState(userRole === 'Admin' ? true : false);

  function getSelected(ev) {
    const divArr = document.getElementsByClassName('link-box');
    Array.from(divArr).forEach((div) => {
      if (div.classList.contains('selected')) div.classList.remove('selected');
    });
    for (let i = 0; i < divArr.length; i++) {
      if (divArr[i].contains(ev.target)) {
        divArr[i].classList.add('selected');
        return divArr[i].querySelector('h6').innerText;
      }
    }
    return null;
  }
  return (
    <div id='user-dashboard-container'>
      <div id='link-panel'>
        <div
          className='link-box selected'
          onClick={(ev) => setSelected(getSelected(ev))}
        >
          <PersonIcon />
          <h6>Edit Profile</h6>
        </div>
        <div
          className='link-box'
          onClick={(ev) => setSelected(getSelected(ev))}
        >
          <LocalMallIcon />
          <h6>View Orders</h6>
        </div>
        <div
          className='link-box'
          onClick={(ev) => setSelected(getSelected(ev))}
        >
          <DeleteForeverIcon />
          <h6>Delete My Account</h6>
        </div>
        <div
          className={`link-box ${!isAdmin ? 'hidden' : ''}`}
          onClick={(ev) => setSelected(getSelected(ev))}
        >
          <SupervisorAccountIcon />
          <h6>Admin</h6>
        </div>
      </div>
      <div id='user-dashboard-content-container'>
        {selected === 'Delete My Account' ? <DeleteUser /> : null}
        {selected === 'Edit Profile' ? <UserProfile /> : null}
        {selected === 'View Orders' ? <h3>View my orders</h3> : null}
        {selected === 'Admin' ? <Admin /> : null}
      </div>
    </div>
  );
};
