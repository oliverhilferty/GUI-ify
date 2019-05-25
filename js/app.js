const electron = require('electron');
const components = require('./js/components');
const $ = require('jquery');

// Receive messages from renderer process
electron.ipcRenderer.on('ping', (event, message) => {
    $('body').append(components.textInput(6, 'some-id', 'My Label'));
});