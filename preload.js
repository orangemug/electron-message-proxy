var electron = require('electron');                                                

  
window.addEventListener("message", function(e) {
  var data = e.data;
  if(data.type === "from-client") {                                                       
    electron.ipcRenderer.send('electron-api-message', data.message);
  } 
})
    
electron.ipcRenderer.on('electron-api-message', (event, message) => {
  console.log("MESSAGE", message);                                                        
  window.postMessage({
    type: "from-host",
    message: message
  }, "*");
})  
