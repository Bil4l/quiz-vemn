<template>
    <div>
        <div class="wrapper">
            <question></question>
            <player-list></player-list> 
            <chat></chat>
            <chat-input></chat-input>
            <room-id></room-id>
            <chrono></chrono>
        </div>
        <button @click.prevent="startQuiz" v-if="!hasStarted"> Start game ! </button>
    </div>
</template>

<script>
import quizDispatcher from '../services/ws'
import { mapState} from 'vuex'
import store from '../store'

import PlayerList from './PlayerList.vue'
import Chat from './Chat.vue'
import Question from './Question.vue'
import RoomId from './RoomId.vue'
import ChatInput from './ChatInput.vue'
import Chrono from './Chrono.vue'

export default {
    components:{
        PlayerList,
        Chat,
        Question,
        RoomId,
        ChatInput,
        Chrono
    },
    

    methods: {
        startQuiz: function(){
            
            console.log("Started quiz");
            quizDispatcher.connection.send(JSON.stringify({event : "quizState", content:true}));
        },
    },
    computed: mapState([
        'gameOn',
        'hasStarted',
    ]),
    created() {
        quizDispatcher.start(); 
    },
}   
</script>

<style >

ul{
    list-style: none;
}

.wrapper{
    display: grid;
    width:60%;
    height: 500px;

    grid-template-columns: 1fr 3fr;
    grid-template-rows: 2fr 1fr 8fr 1fr ;
    margin: auto;   
}


</style>