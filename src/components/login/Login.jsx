import React, {useEffect, useState} from 'react';
import { fetchUserName , fetchLoginStatus} from '../services/services';
import './login.css';
import { errorMessages } from '../../ErrorMessages';

function Login({props}){
	const [errorMes, setErrorMess] = useState("");
	const [username, setUserName] = useState("");
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		fetchLoginStatus()
			.then(obj => {
				props.setIsLoggedIn(true);
			})
			.catch((err) => {
				setErrorMess(err.error);
				props.setIsLoggedIn(false);
			});
	}, []);

	const performLogin = (() => {
		fetchUserName({username})
				.then( function(response) {
					props.setUser(username);
					props.setIsLoggedIn(true);
				})
				.catch((err) =>{
					setErrorMess(errorMessages[err.code || 'DEFAULT']);
					props.setIsLoggedIn(false);
				});
	});

	const handleInput = ((input) => {
		setUserName(input);
		if(input === ""){
			setDisabled(true);
		}else{
			setDisabled(false);
		}
	});
	return (
		<div className = "login-page">
			<h1 className="login-header">Chat Application:</h1>
			<input class="username" type="text" placeholder="Enter username" value={username} onChange={ e => handleInput(e.target.value) }/>
			<button class="login-user" type="submit" disabled={disabled} onClick={performLogin}>Login</button>
			<div className="error-mess">{errorMes}</div>
		</div>
	);
}

export default Login;

