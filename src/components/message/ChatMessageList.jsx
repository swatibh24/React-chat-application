import React from 'react';
import './message.css';

function ChatMessageList({messages}){
	return (
		<ol className="mes-list">{
				messages.map((obj,no)=>{
					return <li key={no} className="user-message">
						<div className="message-icon">
							<img className="user-icon" src={obj.image}/>
							<span className="message-list">{obj.sender}</span>
						</div>
						<div className="message-text">
							<span>{obj.text}</span>
							<span className="timestamp">{obj.timeStamp}</span>
						</div>
					</li>
				})
			}
		</ol>
	);
};

export default ChatMessageList;