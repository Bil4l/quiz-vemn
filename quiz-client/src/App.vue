<template>
  <div id="app">
    <login @joined-room="joinRoom" v-if="!isRoomJoined"></login>
    <quiz  v-if="isRoomJoined"></quiz>
  </div>
</template>

<script>

import Login from './components/Login.vue'
import Quiz from './components/Quiz.vue'

export default {
  name: 'App',
  components: {
    Quiz,
    Login
  },
  methods: {
    joinRoom(){
      this.isRoomJoined = true;
    }
  },
  data() {
    return {
      isRoomJoined: false,
    }
  },
  mounted: function() {
    console.log("Done");
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
