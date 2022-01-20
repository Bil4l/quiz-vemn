<template>
    <div class="quizChat">
        <ul>
            <li v-for="answer in answersList" :key="answer.sentTime" :class="answer.type">
                {{answer.content}}
            </li>
        </ul>
    </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
    computed: mapState([
        'answersList',
    ]),

}
</script>

<style scoped>

    .quizChat{
        display: flex;
        flex-direction: column-reverse;
        overflow: auto;
        align-items: baseline;
        font-size: small;
        grid-row-start: 3;
        
        text-align: left;
        
        border-top-right-radius: 15px;
        background: linear-gradient(180deg, rgba(45,0,0,1) 0%, rgba(105,1,0,1) 90%);
    }

    li{
        margin-top:5px;
    }
    .regular{
        color:rgb(179, 154, 184);
        text-shadow: 1px 0px  ;
        
    }

    .playerSuccess{
        color:yellow;
        text-shadow: 1px 0px  ;
    }
    
    .question{
        color:white;
        /* color: rgb(238, 198, 67); */
        border-bottom: 1px solid white;
        margin-right : -250px;
        padding: 5px;

    }

    .showCorrectAnswer{
        color: rgb(238, 198, 67);
        text-shadow: 1px 0px  ;
    }

</style>


