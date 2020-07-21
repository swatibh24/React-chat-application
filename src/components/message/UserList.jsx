import React, { useState, useEffect } from 'react';
import {getUsersList} from '../services/services';
import './message.css';

function UserList({props}) {
  const [users, setUsers] = useState([]);
  const user = props.user;

  useEffect(() => {
    getUsersList(user)
        .then( userList => {
          setUsers(userList);
        })
        .catch(function(err){
          props.setError(err.message);
        });
  }, [props, user]);


  const userList = users.map( function (user,no){
        return <li key={no}>
          <div>
            <div className="icon-content">
              <img className="user-icon" alt="user icon" src={user.image}/>
            </div>
            <span className="user-list">{user.sender}</span>
          </div>
        </li>
      }
  );

  return (
      <ul className="users">
        {userList}
      </ul>
  );
};

export default UserList;