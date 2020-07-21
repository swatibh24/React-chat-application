import React, { useState } from 'react';
import ChatWeb from './components/message/ChatWeb';
import Login from './components/login/Login';

function App() {
	const [user, setUser] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	if(user !== ""){
		return (
		<div className="main">
			<ChatWeb props={{user:user, setUser:setUser}}/>
		</div>
		);
 	}else{
		return(
		<div className="main"><Login props={{user:user,setUser:setUser,isLoggedIn:true,setIsLoggedIn:setIsLoggedIn}}/></div>
		);
 	}

}


export default App;
