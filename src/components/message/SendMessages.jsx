import React, {useState } from 'react';
import {sendChatMessage} from '../services/services';
import './message.css';

function SendMessages({props}){
    const [message, setMessage] = useState("");
    const handleInput = ((inputText) => {
        setMessage(inputText);
    });

    const fetchMessage  = (() => {
        const user = props.user;
        sendChatMessage({user, message})
            .then( function(response) {
                setMessage("");
                props.refreshMessages();
            })
            .catch(function(err) {
                props.setError(err.message);
            });
    });

    return (
        <div className="send-message">
            <input type="send-message" className="to-send" value={message} placeholder="Enter message" onChange={ e => handleInput(e.target.value)}/>
            <button className="send-btn" type="submit" onClick={fetchMessage}>Send Message</button>
        </div>
    );
}

export default SendMessages;
