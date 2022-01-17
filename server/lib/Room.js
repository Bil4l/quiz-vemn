class Room {
    constructor(isQuizzOn,isReachable,quiz) {
      this.isQuizzOn = isQuizzOn;
      this.isReachable = isReachable;
      this.quiz = quiz;
      this.timerID = undefined;
      this.questionCounter = 0;
      this.correctAnswers = 0;
      this.players = []
    }
    
  
    addPlayer(player) {
      this.players.push(player);
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
      }else if(this.questionCounter < this.quiz.length){
        if(this.isQuizzOn ){
          this.sendAll(JSON.stringify({event:"playersScore", content:this.players.map(player=>{
            return {username:player.username,connectionTime:player.connectionTime,score:player.score}
          })}))
          this.sendAll(JSON.stringify({event:"nextQuestion",content:true}));
          this.questionCounter ++;
          this.correctAnswers = 0;
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

