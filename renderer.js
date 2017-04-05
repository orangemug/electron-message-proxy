var EventEmitter = require('events');


module.exports = function() {
  var emitter = new EventEmitter();

  function messageFn(e) {
    var data = e.data;

    if(data.type === "main") {                                                     
      emitter.emit(data.event, data.args);
    }
  }

  window.addEventListener("message", messageFn);

  emitter.send = function(event, args) {
    window.postMessage({
      type: "renderer",
      event: event,
      args: args
    }, "*");
  }

  emitter.destroy = function() {
    window.removeEventListener("message", messageFn);
  }

  return emitter;
}
