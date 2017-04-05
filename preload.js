var electron = require('electron');                                                

  
window.addEventListener("message", function(e) {
  var data = e.data;

  if(data.type === "renderer") {                                                       
    electron.ipcRenderer.send('electron-api-message', data);
  } 
})
    
electron.ipcRenderer.on('electron-api-message', (event, data) => {
  window.postMessage(data, "*");
})  
