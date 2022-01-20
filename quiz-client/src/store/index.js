import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        gameRoomId: "",
        gameOn: false,
        hasStarted:false,
        currentQuestion: '',
        answersList: [],
        playersList:[],
        questionCounter:0,
        goodAnswer:false,
        scoreAdded:0,
    },
    mutations:{
        joinGameRoom(state, id){
            state.gameRoomId = id
        },

        toggleGameOn(state){
            state.gameOn = true;
        },

        toggleGameOff(state){
            state.gameOn = false;
        },

        setCurrentQuestion(state,question){
            state.currentQuestion = question
        },

        increaseQuestionCounter(state){
            state.questionCounter++;
        },

        startQuiz(state){
            state.hasStarted= true;
        },
        
        stopQuiz(state){
            state.hasStarted=false;
        },

        addAnswer(state,answer){
            state.answersList.push(answer)
        },

        updatePlayersList(state,players){
            state.playersList = players;
        },

        rankPlayers(state){
            state.playersList.sort((a,b)=>parseInt(b.score)-parseInt(a.score));
        },

        playerHasGoodAnswer(state,score){
            state.goodAnswer = !state.goodAnswer;
            state.scoreAdded = score;
        },
    }
})