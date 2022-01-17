<template>
    <div class="roomIdContainer">
       <p>{{ gameRoomId }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:mapState([
        'gameRoomId',
    ])
    
}
</script>

<style>
.roomIdContainer{
    grid-column: 1;
    grid-row: 4;
    background-color: rgb(179, 167, 183);
    border-bottom-left-radius: 15px;
}   
</style>