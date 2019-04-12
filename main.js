const ArgumentParser = require('argparse').ArgumentParser;
const execSync = require('child_process').execSync;
const chalk = require('chalk');

/**
 *
 * @param {string} paramString
 * @param {string} character
 * @returns {string}
 */
let cleanLeadingCharacter = (paramString, character) => {
    while (paramString[0] === character) {
        paramString = paramString.slice(1);
    }
    return paramString;
};

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

/**
 * Breaks up a usage string into an array of it's flags and params
 * @param {string} usageString
 * @returns {string[]}
 */
let splitUsageString = (usageString) => {
    return usageString.split(/\[|] \[|] |]\r/).filter((el) => {
        return el !== ''
            && el.indexOf('-h') === -1
            && el.indexOf('usage:') === -1
    });
};

/**
 * Resolves the output of splitUsageString into an object containing positional and optional
 * arguments, flags, and flag groups
 * @param {string[]} paramsArray
 * @returns {{positionalArgs: Array, optionalArgs: Array, flags: Array, groupedFlags: Array}}
 */
let parseArguments = (paramsArray) => {
    let parsedArgs = {
        positionalArgs: [],
        optionalArgs: [],
        flags: [],
        groupedFlags: []
    };
    for (let param of paramsArray) {
        if (param.indexOf(' ') > -1) { // Optional parameter
            parsedArgs.optionalArgs.push(param.split(' ')[1]);
        } else {
            if (param[0] === '-') { // Optional flag
                let cleanedParam = cleanLeadingCharacter(param, '-');
                parsedArgs.flags.push(cleanedParam);
            } else {
                parsedArgs.positionalArgs.push(param);
            }
        }
    }
    return parsedArgs;
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

let params = splitUsageString(usageString);
console.log(params);
console.log(parseArguments(params));
