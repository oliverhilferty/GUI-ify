const ArgumentParser = require('argparse').ArgumentParser;
const HelpParser = require('./parser').CommandLineHelpParser;
const execSync = require('child_process').execSync;
const utils = require('./utils');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
// const chalk = require('chalk');

let parser = new ArgumentParser({
    addHelp: true,
    prog: 'GUI-ify'
});

parser.addArgument(
    ['CLI'],
    {
        help: 'The CLI tool to convert to GUI'
    }
);

let args = parser.parseArgs();

let out = execSync(`${args.CLI} --help`).toString();
let usageString = utils.extractUsageString(out);

const CLIParser = new HelpParser();
const parsedHelpText = CLIParser.parse(usageString);
console.log(parsedHelpText);

app.on('ready', () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Pass the parsed help text to the 'browser' window
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('ping', parsedHelpText);
    })
});