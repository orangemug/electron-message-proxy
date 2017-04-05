var electron     = require("electron");
var EventEmitter = require('events');


module.exports = function(browserWin) {
  var emitter = new EventEmitter();

  function ipcMainFn(event, message) {
    if(event.sender === browserWin.webContents) {
      emitter.send("", message);
    }
  }

  electron.ipcMain.on('electron-api-message', ipcMainFn);

  emitter.send = function(data) {
    browserWin.webContents.send("electron-api-message", data);
  };

  emitter.destroy = function() {
    electron.ipcMain.off('electron-api-message', ipcMainFn);
  };

  return emitter;
};


