<template>
    <div class="questionContainer">
        <h3> {{currentQuestion}} </h3>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:mapState([
        'currentQuestion'
    ]),
    
}
</script>

<style>
.questionContainer{
    background-color: rgb(137, 70, 166);
    grid-column:1/3;
    border-radius: 20px;

    margin: 1em;
}
</style>