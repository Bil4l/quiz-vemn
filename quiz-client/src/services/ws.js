import {WebSocketDispatcher} from './client.dispatcher'
import store from '../store'
import Timer from './Timer'
import {nanoid} from 'nanoid'


const URL = "ws://localhost:3000"

const getNextQuestion =  function (){
    pendingTimer.cancel();
    console.log("On est prêt à recevoir la suivante!")
    quizDispatcher.connection.send(JSON.stringify({event:"quizState",content:true}));
}

const pendingTimer = new Timer(undefined,10*1000,getNextQuestion);



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
    store.commit('toggleGameOn');
    store.commit('setCurrentQuestion',question);
    store.commit('increaseQuestionCounter');
    store.commit('addAnswer', {content:"--------------------------------------",sentTime:nanoid()})
    store.commit('addAnswer', {content:`QUESTION ${store.state.questionCounter}`,sentTime:nanoid()})
    store.commit('addAnswer', {content:"--------------------------------------",sentTime:nanoid()})
};



const toNextQuestion = function (){
    store.commit('toggleGameOff');
    store.commit('setCurrentQuestion','');
    pendingTimer.launch();
    
}

const finishQuiz = function() {
    
    store.commit('toggleGameOff');
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
