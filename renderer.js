var EventEmitter = require('events');


module.exports = function() {
  var emitter = new EventEmitter();

  function messageFn(e) {
    var data = e.data;
    if(data.type === "from-host") {                                                     
      console.log(">> from client", data.message);
      emitter.emit("foo", data.message)
    }
  }

  window.addEventListener("message", messageFn);

  emitter.send = function(message) {
    window.postMessage({
      type: "from-client",
      message: message
    }, "*");
  }

  emitter.destroy = function() {
    window.removeEventListener("message", messageFn);
  }

  return emitter;
}
