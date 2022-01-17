import {WebSocketDispatcher} from './client.dispatcher'
import store from '../store'
import Timer from './Timer'


const URL = "ws://localhost:3000"


const quizDispatcher = new WebSocketDispatcher(URL);

const joinGameRoom = function (roomId) {
    //console.log("RECU UN ROOM ID");
    store.commit('joinGameRoom',roomId);
};

const dispPlayer = function(players){
    // console.log("NEW PLAYER JOINED");
    // console.log(players);
    
    store.commit('updatePlayersList',players);
    store.commit('rankPlayers');
};

const startQuiz = function(question){
    store.commit('startQuiz');
    store.commit('updateGameState');
    store.commit('setCurrentQuestion',question);
};

const getNextQuestion =  function (){
    quizDispatcher.connection.send(JSON.stringify({event:"quizState",content:true}));
}

const toNextQuestion = function (){
    store.commit('updateGameState');
    store.commit('setCurrentQuestion','');
    const pendingTimer = new Timer(undefined,10*1000,getNextQuestion);
    pendingTimer.launch();
    
}

const finishQuiz = function() {
    store.commit('updateGameState');
    store.commit('stopQuiz');
    store.commit('setCurrentQuestion','Quiz terminé!');
}

const dispAnswer = function(answer){
    store.commit('addAnswer', {content: answer, sentTime:performance.now()})
}

quizDispatcher.on("roomId",joinGameRoom);

quizDispatcher.on("question",startQuiz);
quizDispatcher.on("nextQuestion",toNextQuestion);

quizDispatcher.on("answer", dispAnswer);

quizDispatcher.on("playerJoined",dispPlayer);
quizDispatcher.on("playerLeft",dispPlayer);
quizDispatcher.on("playersScore",dispPlayer);

quizDispatcher.on("quizIsOver", finishQuiz);

quizDispatcher.start();



export default quizDispatcher
