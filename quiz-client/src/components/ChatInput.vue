<template>
    <div class="quizInputContainer"> 
            <input ref="answer" placeholder="Tapez votre réponse" type="text" v-model="answer" v-on:keyup.enter="sendAnswer" class="quizInput">
    </div>
</template>

<script>
import quizDispatcher from '../services/ws'
import store from '../store'

export default {
    data() {
        return {
            answer: '',
        };
    },

    methods: {
        sendAnswer: function(){
            
            if(this.answer != ''){
                quizDispatcher.connection.send(JSON.stringify({event:"answer",content:this.answer}));
            }
            this.answer = '';
        },
    },

}
</script>

<style scoped>
    .quizInputContainer{
        background-color: rgba(105,1,0,1);
        justify-self: start stretch;
        grid-column: auto;
        grid-row:4;
        border-bottom-right-radius: 15px;

    }

    .quizInput{
        width:90%;
        height:80%;
        border:none;
        border-top:2px solid rgba(80,0,0,1);
        outline: none;
        background-color: transparent;
        color:rgb(179, 154, 184);
        text-shadow: 1px 0px;
    }

</style>