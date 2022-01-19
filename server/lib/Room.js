class Room {
    constructor(isQuizzOn,isReachable,quiz) {
      this.isQuizzOn = isQuizzOn;
      this.isReachable = isReachable;
      this.quiz = quiz;
      this.timerID = undefined;
      this.questionCounter = 0;
      this.correctAnswers = [];
      this.players = []
    }
    
  
    addPlayer(player) {
      if(this.players.map(player=>{return player.username}).includes(player.username)){
        player.username = `${player.username}${Math.floor(Math.random()*100)}`;
        this.players.push(player);
      }else{
        this.players.push(player);
      }
    }
  
    sendAll(message){
      this.players.forEach(player => {
        player.send(message);
      });
    }
    
    sendOthers(player,message){
      this.players.forEach(otherPlayer =>{
        if (player != otherPlayer){
          otherPlayer.send(message);
        }
      })
    };

    removePlayer(player){
      const index = this.players.indexOf(player);
      this.players.splice(index,1);
    }
  
    goToNextQuestion(){
      this.cancelTimer();
      if (this.questionCounter + 1 === this.quiz.length){
        this.sendAll(JSON.stringify({event:"quizIsOver",content:true}));
        this.sendAll(JSON.stringify({event:"playersScore", content:this.players.map(player=>{
          return {username:player.username,connectionTime:player.connectionTime,score:player.score}
        })}))
      }else if(this.questionCounter < this.quiz.length){
        if(this.isQuizzOn){
          this.sendAll(JSON.stringify({event:"playersScore", content:this.players.map(player=>{
            return {username:player.username,connectionTime:player.connectionTime,score:player.score}
          })}))
          this.sendAll(JSON.stringify({event:"nextQuestion",content:true}));
          this.questionCounter ++;
          this.correctAnswers = [];
          this.isQuizzOn = false;
          this.timerID = undefined;
        }
      }
    }
  
    launchTimer(){
      if (typeof this.timerID === 'number'){
        this.cancelTimer();
      }
      this.timerID = setTimeout(this.goToNextQuestion.bind(this),25*1000);
    }
  
    cancelTimer(){
      clearTimeout(this.timerID);
    }
}

module.exports = Room;

