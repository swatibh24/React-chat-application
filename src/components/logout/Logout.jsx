import React, { useState } from 'react';
import {performLogout} from '../services/services';
import './logout.css';

function Logout({username, performLogout}){
    return (
        <div><button className="logout-button" type ="submit" onClick ={ (e) => {performLogout(username)}}>Logout</button></div>
    );
}
export default Logout;