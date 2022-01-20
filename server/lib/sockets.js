const WebSocket = require('ws');
const { customAlphabet } = require('nanoid');
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 6);

const dispatcher = require('./dispatcher');
const {generateQuiz} = require('../lib/generateQuiz');
const Room = require('./Room');

let rooms = new Map();

function playerFromWS(ws,roomId,username,isHost){
  ws.roomId = roomId;
  ws.username = username;
  ws.score = 0;
  ws.isHost = isHost;
  ws.connectionTime = performance.now();
}

function connection(ws) {

  ws.id = nanoid(8);

  function loadQuestion(quizState){
    const currentRoom = rooms.get(ws.roomId);
    console.log(ws.isHost ? "Host" : "Pas Host");
    if (ws.isHost){
      if (currentRoom.questionCounter < currentRoom.quiz.length){
        currentRoom.isQuizzOn = true;
        currentRoom.isReachable = false;

        currentRoom.sendToAll("question", currentRoom.quiz[currentRoom.questionCounter].statement);
        
        currentRoom.launchTimer();
      }
    }
  }

  function checkAnswer(answer) {
    const currentRoom = rooms.get(ws.roomId);

    if (currentRoom.isQuizzOn && answer===currentRoom.quiz[currentRoom.questionCounter].answer) {
      
      
      if (!(currentRoom.correctAnswers.includes(ws))){
        currentRoom.sendToPlayer(ws,"goodAnswer", true);
        currentRoom.correctAnswers.push(ws);
        let scoreAdded = (8-currentRoom.correctAnswers.length);
        ws.score += scoreAdded  ;
        currentRoom.sendToAll("playerSuccess",`${ws.username} trouve la réponse (+${scoreAdded} pts)`);
      }
      
      if (currentRoom.players.length === currentRoom.correctAnswers.length && currentRoom.isQuizzOn){
        currentRoom.cancelTimer();
        currentRoom.goToNextQuestion();
      }
    } else {
      currentRoom.sendToAll("answer",`${ws.username} > ${answer}`);
    }
    
  };

  async function joinRoom(content){
    
    if (rooms.has(content.id)&&rooms.get(content.id).isReachable && rooms.get(content.id).players.length < 6) {
      // La salle existe déjà on la rejoint
      let existingRoom = rooms.get(content.id);

      playerFromWS(ws,content.id,content.username,false);
      existingRoom.addPlayer(ws);

    } else {
      // La salle n'existe pas, on la crée

      let newRoomId = nanoid(5);
      let newRoom = new Room(false,true,await generateQuiz(2),newRoomId);

      playerFromWS(ws,newRoomId,content.username,true);
      rooms.set(newRoomId,newRoom);
      newRoom.addPlayer(ws);
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
      currentRoom.removePlayer(ws);

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
