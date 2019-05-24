const electron = require('electron');
electron.ipcRenderer.on('ping', (event, message) => {
    document.write(`<pre>${JSON.stringify(message)}</pre>`);
});