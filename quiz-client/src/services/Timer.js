class Timer{
    constructor(id,waitTime,callback){
        this.id = id;
        this.waitTime = waitTime;
        this.callback = callback;
    }

    cancel(){
        clearTimeout(this.id);
    }

    launch(){
        if(typeof this.id==='number'){
            this.cancel();
        }
        this.id = setTimeout(this.callback,this.waitTime);
    }
}

export default Timer