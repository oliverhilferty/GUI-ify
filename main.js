const ArgumentParser = require('argparse').ArgumentParser;
const Parser = require('./parser').CommandLineHelpParser;
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
    ['--CLI'],
    {
        help: 'The CLI tool to convert to GUI'
    }
);
parser.addArgument(
    ['--test'],
    {
        help: 'Test the parser against an arbitrary string'
    }
);

let args = parser.parseArgs();

let out = execSync(`${args.CLI} --help`).toString();
let usageString = getUsageString(out);

// let params = splitUsageString(usageString);
// console.log(params);
// console.log(parseArguments(params));

let argumentSet = new Parser(usageString);
console.log(argumentSet);