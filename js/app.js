const electron = require('electron');
const components = require('./js/components');
const $ = require('jquery');

// Receive messages from renderer process
electron.ipcRenderer.on('ping', (event, message) => {
    for (const arg of message.positionalArgs) {
        $('.positionalArgs').append(components.textInput(12, arg.name, arg.name));
    }

    for (const arg of message.optionalArgs) {
        $('.optionalArgs').append(components.textInput(12, arg.name, arg.name));
    }

    for (const flag of message.flags) {
        $('.flags').append(components.checkbox(flag.name));
    }
});