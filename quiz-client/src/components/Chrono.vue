<template>
    <div class="question-timer-container">
        <div v-show="this.gameOn" class="question-timer"></div>
        <div v-show="!this.gameOn&&this.hasStarted" class="waiting-timer"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {

    computed:mapState([
        'gameOn',
        'hasStarted',   
    ]),
    
}
</script>

<style>


.question-timer-container{
    width:100%;
    height: 80%;
    background-color: rgb(179, 167, 183);
    display: flex;
    align-content: start;
    align-items: center;
    grid-column: 1/3;
}
.question-timer{
    height: 70%;
    width: 0%;

    margin-left:1%;
    
    background-color:rgb(137, 200, 166);

    animation: progress-slider 25s linear;
}

.waiting-timer{
    height: 70%;
    width: 0%;

    margin-left:1%;
    
    background-color:rgb(137, 200, 166);

    animation: progress-slider 10s linear;

}

@keyframes progress-slider {
    from {
        width:98%;
        
    }

    to {
        width: 0%;
        
    }
}

</style>