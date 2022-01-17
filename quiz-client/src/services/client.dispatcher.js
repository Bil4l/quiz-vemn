class WebSocketDispatcher {
  constructor(url) {
    this.events ={};
    this.connection = new WebSocket(url);
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

  start() {
    const dispatch = function(message){
      const res = JSON.parse(message.data);
      // console.log(res.content);
      console.log(res);
      if (this.events[res.event]){
        // console.log(this.events[res.event]);
        this.events[res.event].fire(res.content);
      }
    }
    this.connection.onmessage = dispatch.bind(this);
  }
}

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

export {WebSocketDispatcher,DispatcherEvent};
