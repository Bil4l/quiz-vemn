<template>
    <div class="playersList">
        <div class="playersListHeader">Players connected:</div>
            <transition-group name="players" tag="div">
                <div class="player" v-for="player in playersList" :key="player.connectionTime">
                    {{player.username}} : {{player.score}} pts
                </div>   
            </transition-group>
        <div v-if="goodAnswer" class="correctAnswer">
            <svg version="1.1" width="250" height="300" xmlns="http://www.w3.org/2000/svg">
             
                <ellipse cx="105" cy="180" rx="75" ry="60"  fill-opacity="0.8"  />
                <text x="100" y="180" font-size="70" text-anchor="middle" fill="red">+ {{this.scoreAdded}} </text>
                <text x="100" y="220" font-size="30" text-anchor="middle" fill="red"> POINTS </text>
            <g transform="scale(0.2)"> 
                <!-- Dans l'ordre: Gauche Bas Haut Droite -->
                <polygon id="leftStar" points="100,10 40,180 190,60 10,60 160,180" fill-opacity="0" fill="white" />
                <polygon id= "bottomStar" points="100,10 40,180 190,60 10,60 160,180"  fill-opacity="0" fill="white" /> 
                <polygon id = "topStar" points="100,10 40,180 190,60 10,60 160,180"  fill-opacity="0" fill="white" /> 
                <polygon id ="rightStar" points="100,10 40,180 190,60 10,60 160,180" fill-opacity="0" fill="white"/>
            </g>
            </svg>
        </div>
    </div>
</template>


<script>
import { mapState} from 'vuex'

export default {
    computed:mapState([
        'playersList',
        'goodAnswer',
        'scoreAdded'
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
    position: relative;
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

.players-move{
    transition: transform 1s;
}

.correctAnswer{
    position:absolute;
    display: flex;
    flex-direction: column;
}

#leftStar{
    animation: left-star-leave 0.4s ease-out;
    animation-delay: 0.3s;
}

#bottomStar{
    animation:bottom-star-leave 0.4s ease-out;
    animation-delay: 0.3s;
}

#topStar{
    animation:top-star-leave 0.4s ease-out;
    animation-delay: 0.3s;
}

#rightStar{
    animation:right-star-leave 0.4s ease-out;
    animation-delay: 0.3s;
} 

@keyframes left-star-leave {
    from{
        transform:  translate(300px, 800px);
        fill-opacity: 0.6;
    }
    to{
        transform : translate(-200px, 800px);
        fill-opacity: 0;
    }
}
@keyframes bottom-star-leave {
    from{
        transform:  translate(400px, 1000px);
        fill-opacity: 0.6;
    }
    to{
        transform : translate(400px, 1600px);
        fill-opacity: 0;
    }
}
@keyframes top-star-leave {
    from{
        transform:  translate(400px, 600px);
        fill-opacity: 0.6;
    }
    to{
        transform : translate(400px, 0);
        fill-opacity: 0;
    }
}
@keyframes right-star-leave {
    from{
        transform:  translate(700px, 800px);
        fill-opacity: 0.6;
    }
    to{
        transform : translate(1100px, 800px);
        fill-opacity: 0;
    }
}

svg>text{
    fill-opacity: 0;
    animation: reveal-text 2.3s ease-in;
}

@keyframes reveal-text {
    from{
        fill-opacity: 0;
    }
    30%{
        fill-opacity: 1;
    }
    70%{
        fill-opacity: 1;
    }
    to{
        fill-opacity: 0;
    }
}


ellipse {
    fill:white;
    fill-opacity: 0;
    transform: rotate(330deg);
    transform-box: fill-box;
    transform-origin: center;
    animation: ellipse-rotate 2.5s ease-out ;
}

@keyframes ellipse-rotate {
    from{
        transform-origin: center;
        transform: scale(0.1) rotate(0deg);
        fill-opacity: 0.4;
    }
    50%{
        transform-origin:center;
        transform:scale(1) rotate(690deg);
        fill-opacity:  0.4;
    }
    75%{
        transform-origin:center;
        transform:scale(1) rotate(690deg);
        fill-opacity: 0.4;
    }
    to{
        transform-origin:center;
        transform:scale(0.1) rotate(-270deg);
        fill-opacity:  0.4;

    }
}


</style>

