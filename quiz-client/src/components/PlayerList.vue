<template>
    <div class="playersList">
        <div class="playersListHeader">Players connected:</div>
            <transition-group name="players" tag="div">
                <div class="player" v-for="player in playersList" :key="player.connectionTime">
                    {{player.username}} : {{player.score}} pts
                </div>   
            </transition-group>
    </div>
</template>


<script>
import { mapState} from 'vuex'

export default {
    computed:mapState([
        'playersList'
    ]),

}
</script>

<style scoped>

.playersList{
    background-color: rgb(137, 70, 166);
    grid-row: 3;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 15px;
}

.playersListHeader{
    background-color: rgb(137, 70, 166);
    font-size: large;
    height:15%;
    padding-top: 15%;
    padding-bottom: -15%;
    font-weight: bold;
    border-top-left-radius: inherit;
    text-decoration: underline;
}


.player{
    background-color: rgb(234, 153, 213);
    border-radius: 2em;
    padding-top: 3%;
    padding-bottom: 3%;
    margin-left:3%;
    margin-right: 3%;
    margin-top:3%;
}

.player-move{
    transition: transform 5s;
}
    
</style>

