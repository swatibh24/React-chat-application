const chatMessages = [
  {
    sender: "Swati",
    timeStamp: new Date("2020-07-15 13:00:00"),
    image:"/images/user-icon.png",
    text: "Hi,How are You?",
  },
  {
    sender: "Sneha",
    timeStamp: new Date("2020-07-15 13:10:00"),
    image:"/images/user-icon.png",
    text: "I am fine",
  }
];
const loggedInUsers = [
  {
    sender:"Swati",
    image:"/images/user-icon.png",
  },
  {
    sender:"Sneha",
    image:"/images/user-icon.png",
  }
];

function addUser({uid,sender,timeStamp}){
  const image = "/images/user-icon.png";
  let object= { sender:sender, timeStamp:timeStamp, image:image}
  let res = loggedInUsers.map(obj => obj.sender);
  if(!res.includes(sender)){
    loggedInUsers.push(object);
  }
}
function addChatMessage({ uid ,sender, timeStamp, text}){
  let image = "/images/user-icon.png";
  loggedInUsers.map((obj) => {
    if(obj.sender == sender){
      image = obj.image;
    }
  });
  let obj = {sender:sender, timeStamp:timeStamp, text:text, image:image}
  chatMessages.push(obj);
}

function deleteLoggedOutUser(sender){
  let res = loggedInUsers.map(obj =>obj.sender);
  for( let i = res.length-1; i >=0; i--){
    if(res[i] == (sender)){
      const index = res.indexOf(sender);
      loggedInUsers.splice(index,1);

    }
  }
}

function updateLoggedInUserTime({sender, timeStamp}) {
  let res = loggedInUsers.map(obj => obj.sender);
  for( let i = res.length-1; i >=0; i--){
    if(res[i] == Object.values(sender)){
      res[i].timeStamp = timeStamp;
    }
  }
}

const utils = {
  loggedInUsers,
  deleteLoggedOutUser,
  chatMessages,
  addUser,
  addChatMessage,
  updateLoggedInUserTime,
};

module.exports = utils;

