import {Dispatcher, DispatcherEvent} from './client.dispatcher.js';

const connection = new WebSocket('ws://localhost:3000/');


const quizzCont = document.querySelector('.quizz-cont');
const sendButton = document.querySelector("#send");
const startButton = document.querySelector('#start');
const questionBox = document.querySelector('#question');
const chat = document.querySelector('.chat');
const message = document.querySelector('#message');

const signCont = document.querySelector('#sign-cont');
const joinButton = document.querySelector('#joinRoom');
const createButton = document.querySelector('#createRoom');

const username = document.querySelector('#username');
const roomId=  document.querySelector('#roomId');

const roomIdTitle = document.querySelector('#dispRoomID');

const playersList = document.querySelector('.playersList');

function dispQuestion(question) {
  questionBox.innerHTML = question;
  message.disabled = false;
};

function dispAnswer(answer) {
  let newmsg = document.createElement("p");
  newmsg.innerHTML = answer;
  chat.appendChild(newmsg);
};

function dispBravo(goodAnswer) {
  if (goodAnswer) {
    let bravo = document.createElement("p");
    bravo.innerHTML = "Bonne réponse chef !!!";
    chat.appendChild(bravo);
    message.disabled = true;
  }

};

function stopQuizz(quizz_over) {
  if (quizz_over) {
    alert("Quizz Fini");
  }
}

function dispRoomID(roomId) {
  roomIdTitle.innerHTML += roomId;
  console.log(roomId);
}

function playerJoined(playersConnected) {
  playersList.innerHTML = "";
  playersConnected.forEach((player) => {
    const newPlayerItem = document.createElement('li');
    newPlayerItem.innerHTML = player;
    playersList.appendChild(newPlayerItem);
  });
}

const myDispatcher = new Dispatcher();

connection.addEventListener("message", (event) => {
  const response = JSON.parse(event.data);
  console.log(response);
  myDispatcher.dispatch(response.event, response.content);
});

myDispatcher.on("question", dispQuestion);
myDispatcher.on("answer", dispAnswer);
// myDispatcher.on("goodAnswer", dispBravo);
myDispatcher.on("quizz_state", nextQuestion);
myDispatcher.on("quizz_over", stopQuizz);
myDispatcher.on("roomId",dispRoomID);
myDispatcher.on("playerJoined", playerJoined);

/*
OUTPOUT :

1. Start quizz {event: "quizz_state", content:true}
2. Envoyer réponse {eve}
*/

//Démarrer le quizz
startButton.addEventListener("click",() => {
  connection.send(JSON.stringify({event : "quizz_state", content: true }))
  startButton.parentNode.removeChild(startButton);
});

//Envoyer réponse au serveur
sendButton.addEventListener("click", () => {
  const data = JSON.stringify({event:"answer", content:message.value});
  // Send composed message to the server
  if (message.value==="") {
    alert("Message invalide");
  } else {
    connection.send(data);
  }
  // clear input fields
  message.value = "";
});

function nextQuestion() {
  console.log("On va passer à la question suivante!");
  connection.send(JSON.stringify({event : "quizz_state", content: true }));
}

joinButton.addEventListener("click",() => {
  if (username.value&&roomId.value) {
    connection.send(JSON.stringify({event : "joinRoom", content: {id:roomId.value, username:username.value} }));
    quizzCont.style.display = "grid";
    signCont.style.display = "none";
    roomId.value = "";
    username.value = "";
  }
});

createButton.addEventListener("click",() => {
  if (username.value) {
    connection.send(JSON.stringify({event : "joinRoom", content: {id:'', username:username.value} }));
    quizzCont.style.display = "grid";
    signCont.style.display = "none";
    username.value = "";
  }
});
