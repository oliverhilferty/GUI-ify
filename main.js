const ArgumentParser = require('argparse').ArgumentParser;
const HelpParser = require('./parser').CommandLineHelpParser;
const execSync = require('child_process').execSync;
const chalk = require('chalk');

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

let argumentSet = new HelpParser(usageString);
console.log(argumentSet);