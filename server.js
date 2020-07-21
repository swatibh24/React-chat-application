const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const { v4: uuidv4 } = require('uuid');
app.use(cookieParser());
const PORT = 3000;
const utils = require('./src/components/constants/utils');
app.use(express.static('./build'));

app.get('/session', (req, res) => {
	let uid = req.cookies.uid;
	console.log("uid..."+uid);
	if (!uid || uid === "") {
		res.status(401).json({error: 'Unauthorized User'});
		return;
	}
	if (!utils.loggedInUsers[uid]) {
		uid = '';
		res.status(403).json({error: 'User does not exist'});
		return;
	}
	res.status(200).json({ userName: utils.loggedInUsers});

});

app.get('/getUsersList/:name', (req,res) => {
	const username = req.params.name;
	if(!username) {
		res.status(401).json({ error: "'username' is required" });
	}else {
		res.status(200).json(utils.loggedInUsers);
	}
});

app.post('/loginUser', express.json(), (req, res) => {
	const { username } = req.body;
	const date = new Date();
	const uid =  Math.floor(Math.random() * 10000);
	const cleanUserName = username.replace(/[^A-Za-z0-9_\-]/g, '');
	if(!cleanUserName){
		res.status(403).json({ code: 'USERNAME_REQUIRED'});
	}else if(cleanUserName === 'dog') {
		res.status(403).json({ code: 'INVALID'});
	}else{
		res.cookie('uid', uid);
		utils.addUser({uid,sender:cleanUserName,timeStamp:date});
		res.status(200).json(" User Login successfully");
	}
});

app.get('/getMessages/:name', (req,res) => {
	const username = req.params.name;
	res.status(200).json(utils.chatMessages);
});

app.post('/sendMessages/:name', express.json(), (req,res)=>{
	const username = req.params.name;
	const uid = req.cookies.uid;
	const message = req.body.message;
	const date = new Date();
	if(message.length!=0){
		utils.addChatMessage({uid,sender:username, timeStamp:date, text:message});
		utils.updateLoggedInUserTime({sender:username, timeStamp:date});
		res.status(200).json("Message sent successfully");
	}
});

app.delete('/logout', express.json(), (req,res) => {
	const username = req.body.username;
	res.clearCookie('uid');
	utils.deleteLoggedOutUser(username);
	res.status(200).json("User logged out successfully");
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
