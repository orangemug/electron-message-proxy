var electron     = require("electron");
var EventEmitter = require('events');


module.exports = function(browserWin) {
  var emitter = new EventEmitter();

  function ipcMainFn(event, data) {
    if(event.sender === browserWin.webContents && data.type === "renderer") {
      emitter.emit(data.event, data.args);
    }
  }

  electron.ipcMain.on('electron-api-message', ipcMainFn);

  emitter.send = function(event, args) {
    browserWin.webContents.send("electron-api-message", {
      type: "main",
      event: event,
      args: args
    });
  };

  emitter.destroy = function() {
    electron.ipcMain.off('electron-api-message', ipcMainFn);
  };

  return emitter;
};


