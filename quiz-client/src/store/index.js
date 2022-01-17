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
    },
    mutations:{
        joinGameRoom(state, id){
            state.gameRoomId = id
        },

        updateGameState(state){
            state.gameOn = !state.gameOn;
        },

        setCurrentQuestion(state,question){
            state.currentQuestion = question
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
        }
    }
})