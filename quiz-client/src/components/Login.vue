<template>
<div>
    <form>
        <input  type="text" v-model="username" placeholder="username">
        <input type="text" v-model="roomId" placeholder="roomId">
        <button @click="onSubmit">Join lobby</button>
    </form>
    
</div>
</template>

<script>

import quizDispatcher from '../services/ws'



export default {

    methods: {
        onSubmit(){
            if (this.username){
                quizDispatcher.connection.send(JSON.stringify({event : "joinRoom", content: {id:this.roomId, username: this.username}}));
                this.$emit("joined-room");
            }
        }
    },
    data() {
        return {
            username:"",
            roomId:"",
        }
    },
}
</script>

<style>

</style>