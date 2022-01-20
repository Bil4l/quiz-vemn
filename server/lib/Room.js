class Room {
    constructor(isQuizzOn,isReachable,quiz,id) {
      this.isQuizzOn = isQuizzOn;
      this.isReachable = isReachable;
      this.quiz = quiz;
      this.id =id;
      this.timerID = undefined;
      this.questionCounter = 0;
      this.correctAnswers = [];
      this.players = [];  
    }
    
  
    addPlayer(player) {
      if(this.players.map(player=>{return player.username}).includes(player.username)){
        player.username = `${player.username}${Math.floor(Math.random()*100)}`;
      }

      this.players.push(player);
      this.sendPlayerList("playerJoined");
      this.sendToAll("answer",`${player.username} a rejoint la partie`);
      this.sendToPlayer(player,"roomId",this.id);
    }

    removePlayer(player){
      const index = this.players.indexOf(player);
      this.players.splice(index,1);
      this.sendToAll("answer",`${player.username} a quitté la partie!`);
      this.sendPlayerList("playerLeft");
    }

    sendPlayerList(event){
    const content = this.players.map(player => {
      return {username:player.username,connectionTime:player.connectionTime,score:player.score};
    });
    this.sendToAll(event,content);
    }

    sendToPlayer(player,event,content){
      let message = JSON.stringify({event:event,content:content})
      player.send(message);
    }
  
    sendToAll(event,content){
      this.players.forEach(player => {
        this.sendToPlayer(player,event,content);
      });
    }
    
    //Pas utilisé pour l'instant
    sendOthers(player,event,content){
      this.players.forEach(otherPlayer =>{
        if (player != otherPlayer){
          this.sendToPlayer(player,event,content);
        }
      })
    };

    
  
    goToNextQuestion(){
      this.cancelTimer();
      if (this.questionCounter + 1 === this.quiz.length){
        this.sendToAll("quizIsOver",true);
        this.sendPlayerList("playersScore");
        this.sendToAll("answer" ,`BRAVO! La réponse était ${this.quiz[this.questionCounter].answer}`);
      }else if(this.questionCounter < this.quiz.length){
        if(this.isQuizzOn){
          this.sendPlayerList("playersScore");
          this.sendToAll("answer" ,`BRAVO! La réponse était ${this.quiz[this.questionCounter].answer}`);
          this.sendToAll("nextQuestion",true);
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

