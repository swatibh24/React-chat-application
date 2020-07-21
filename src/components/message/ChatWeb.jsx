import React, {useState, useEffect} from 'react';
import UserList from './UserList';
import './message.css';
import ChatMessageList from './ChatMessageList';
import SendMessages from './SendMessages';
import {getChatMessages, performLogout} from '../services/services';
import Logout from '../logout/Logout';

function ChatWeb({props}){
	const user = props.user;
	const [messages, setMessages] = useState([]);
	const [errorMes, setErrorMes] = useState([]);
	const REFRESH_TIME = 2000;

	useEffect(() => {
		refreshMessages();
		const pollId = setInterval(() => {
			refreshMessages();
		}, REFRESH_TIME);}, []);


	const refreshMessages = ((user) => {
		getChatMessages(user)
			.then(messagelist => {setMessages(messagelist);})
			.catch(function(err){setErrorMes(err.message);});
		});

	const setError = function (error){
		setErrorMes(error);
	}

	const logoutUser = function(){
		performLogout(user).then( function(response){
			props.setIsLoggedIn(false);
			props.setUser("");
		}).catch(e => {setErrorMes(e.err)});
		props.setUser("");
	};
	
	return(
		<div className="main-app-panel">
			<div className="header">
				<header className="title">Chat Application</header>
				<Logout username={user} performLogout={logoutUser}/>
			</div>
			<div className="chat-app-content">
				<div className="side-panel">
					<UserList props={{user:user, setError:setError}}/>
				</div>
				<div className="message-content">
					<ChatMessageList messages={messages}/>
				</div>
				<div>
					<SendMessages props={{user:user, refreshMessages:refreshMessages}}/>
				</div>
			</div>
		</div>
	);
};

export default ChatWeb;