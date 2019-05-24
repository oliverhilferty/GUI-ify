const ArgumentParser = require('argparse').ArgumentParser;
const HelpParser = require('./parser').CommandLineHelpParser;
const execSync = require('child_process').execSync;
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
// const chalk = require('chalk');


/**
 * Get the string of arguments from a CLI's help string
 * @param {string} helpOutput
 * @returns {number | string}
 */
let getUsageString = (helpOutput) => {
    let usageLines = helpOutput.split('\n');
    for (let line of usageLines) {
        if (line.includes('usage')) {
            return line;
        }
    }
    return -1;
};

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
let usageString = getUsageString(out);

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

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('ping', parsedHelpText);
    })
});