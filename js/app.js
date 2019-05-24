const electron = require('electron');

// Receive messages from renderer process
electron.ipcRenderer.on('ping', (event, message) => {
    document.write(`<pre>${JSON.stringify(message)}</pre>`);
});