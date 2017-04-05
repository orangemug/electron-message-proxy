const assert = require("assert");
const electron = require('electron')
const electronMessageProxy = require("../main");

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const {ipcMain} = require('electron');


setTimeout(function() {
  app.exit(1);
}, 2000);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname+"/preload.js",
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true
    }
  })

  const messageProxy = electronMessageProxy(mainWindow);

  messageProxy.on('host-action', (args) => {
    try {
      assert.deepEqual(args, {
        host: "ok",
        client: "ok"
      });
    } catch(err) {
      console.error(""+err);
      app.exit(1);
      return;
    }
    app.exit(0);
  });

  mainWindow.webContents.on("did-finish-load", function() {
    messageProxy.send("client-action", {host: "ok"});
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
