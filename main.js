const ArgumentParser = require('argparse').ArgumentParser;
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const chalk = require('chalk');

/**
 * Get the string of arguments from a CLI's help string
 * @param {String} helpOutput
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

let parseUsageString = (usageString) => {
    return usageString.split(/\[|] \[|] /).filter(el => el !== '');
};

let parser = new ArgumentParser({
    addHelp: true,
    prog: "GUI-ify"
});

parser.addArgument(
    ["CLI"],
    {
        help: 'The CLI tool to convert to GUI'
    }
);

let args = parser.parseArgs();

let out = execSync(`${args.CLI} --help`).toString();
let usageString = getUsageString(out);
let params = parseUsageString(usageString);

console.log(params);

