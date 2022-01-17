<template>
    <div class="quizChat">
        <ul>
            <li v-for="answer in answersList" :key="answer.sentTime">
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
        color:rgb(179, 154, 184);
        text-shadow: 1px 0px  ;
    }


</style>


