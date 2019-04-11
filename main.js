const ArgumentParser = require('argparse').ArgumentParser;
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const chalk = require('chalk');

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

out = execSync(`${args.CLI} --help`).toString();
console.log(out);
