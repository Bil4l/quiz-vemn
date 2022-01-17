class Dispatcher {
  constructor(url) {
    this.events ={};
    this.connection = new WebSockets(url);
  }

  dispatch(eventName, data){
    const event = this.events[eventName];
    if(event){
      event.fire(data);
    }
  }

  on(eventName, callback){
    let event = this.events[eventName];
    if(!event) {
      event = new DispatcherEvent(eventName);
      this.events[eventName] = event;
    }
    event.registerCallback(callback);
  }

  off(eventName, callback) {
    // First get the correct event
    const event = this.events[eventName];
    // Check that the event exists and it has the callback registered
    if (event && event.callbacks.indexOf(callback) > -1) {
        // if it is registered then unregister it!
        event.unregisterCallback(callback);
        // if the event has no callbacks left, delete the event
        if (event.callbacks.length === 0) {
            delete this.events[eventName];
        }
    }
  }
  start(){
    this.connection.addEventListener("message", function(event){
      const res = JSON.parse(event.data);
      this.dispatch(res.event,res.content);
    });
  }
};


class DispatcherEvent {
  constructor(eventName) {
    this.eventName = eventName;
    this.callbacks = [];
  }

  registerCallback(callback) {
      this.callbacks.push(callback);
    }

  unregisterCallback(callback) {
      // Get the index of the callback in the callbacks array
      const index = this.callbacks.indexOf(callback);
      // If the callback is in the array then remove it
      if (index > -1) {
          this.callbacks.splice(index, 1);
      }
  }


   fire(data) {
     const callbacks = this.callbacks.slice(0);
     callbacks.forEach((callback) => {
       callback(data);
     });

  }
}

export {Dispatcher,DispatcherEvent};
