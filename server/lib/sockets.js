const WebSocket = require('ws');
const { customAlphabet } = require('nanoid');
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 6);


const dispatcher = require('./dispatcher');
const {generateQuiz} = require('../lib/generateQuiz');
const Room = require('./Room');

let rooms = new Map();

function connection(ws) {

  ws.id = nanoid(8);

  function loadQuestion(quizState){
    const currentRoom = rooms.get(ws.roomId);
    
    if (ws.isHost = true){
      if (currentRoom.questionCounter < currentRoom.quiz.length){
        currentRoom.isQuizzOn = true;
        currentRoom.isReachable = false;

        currentRoom.sendAll(JSON.stringify({event:"question",content:currentRoom.quiz[currentRoom.questionCounter].statement}));
        
        currentRoom.launchTimer();
      }
    }
  }

  function checkAnswer(answer) {
    const currentRoom = rooms.get(ws.roomId);

    if (currentRoom.isQuizzOn && answer===currentRoom.quiz[currentRoom.questionCounter].answer) {
      
      
      ws.send(JSON.stringify({event:"goodAnswer", content:true}));

      if (!(currentRoom.correctAnswers.includes(ws))){
        ws.score +=1;
        currentRoom.correctAnswers.push(ws);
        currentRoom.sendAll(JSON.stringify({event:"answer",content:`${ws.username} a trouvé`}));
      }
      
      if (currentRoom.players.length === currentRoom.correctAnswers.length && currentRoom.isQuizzOn){
        currentRoom.cancelTimer();
        currentRoom.goToNextQuestion();
      }
    } else {
      currentRoom.sendAll(JSON.stringify({event:"answer",content:`${ws.username} : ${answer}`}));
    }
    
  };


  async function joinRoom(content){
    
    if (rooms.has(content.id)&&rooms.get(content.id).isReachable) {
      // La salle existe déjà on la rejoint
      let existingRoom = rooms.get(content.id);

      ws.isHost = false;
      ws.roomId = content.id
      ws.connectionTime = performance.now();
      ws.username = content.username;
      ws.score = 0;
      existingRoom.addPlayer(ws);

      existingRoom.sendAll(JSON.stringify(
        {event:"playerJoined", content:existingRoom.players.map(player=>{
          return {username:player.username,connectionTime:player.connectionTime,score:player.score};
        })}
      ));

      existingRoom.sendAll(JSON.stringify({event:"answer",content:`${ws.username} a rejoint la partie`}));

      ws.send(JSON.stringify({event:"roomId",content:content.id}));
    } else {
      // La salle n'existe pas, on la crée

      let newRoomId = nanoid(5);
      let newRoom = new Room(false,true,await generateQuiz(2));

      ws.isHost = true;
      ws.roomId = newRoomId;
      ws.connectionTime = performance.now();
      ws.username = content.username;
      ws.score = 0;

      newRoom.addPlayer(ws);
      rooms.set(newRoomId,newRoom);


      newRoom.sendAll(JSON.stringify(
        {event:"playerJoined", content:newRoom.players.map(player=>{
          return {username:player.username,connectionTime:player.connectionTime,score:player.score}; 
        })}
      ));
      
      newRoom.sendAll(JSON.stringify({event:"answer",content:`${ws.username} a rejoint la partie`}));

      ws.send(JSON.stringify({event:"roomId",content:newRoomId}));

      
    }
  }

  const wsDispatcher = new dispatcher.Dispatcher();

  wsDispatcher.start(ws);

  wsDispatcher.on("quizState", loadQuestion);
  wsDispatcher.on("answer", checkAnswer);
  wsDispatcher.on("joinRoom", joinRoom);


  ws.on('close',()=>{
    if (ws.roomId){
      const currentRoom = rooms.get(ws.roomId);
      currentRoom.sendOthers(ws,JSON.stringify({event:"answer",content:`${ws.username} a quitté la partie!`}));
      currentRoom.removePlayer(ws);
      currentRoom.sendAll(JSON.stringify(
        {event:"playerLeft", content:currentRoom.players.map(player=>{
          return {username:player.username,connectionTime:player.connectionTime, score:player.score}; 
        })}
      ));

      if (currentRoom.players.length === 0){
        rooms.delete(currentRoom.id);
      };
    }
  });

}

function  init(server) {
  
  const wss = new WebSocket.Server({ server: server });
  console.log("Websockets server launched!");

  wss.on('connection', connection);

}

module.exports = {
  init
};
