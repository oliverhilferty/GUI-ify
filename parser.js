const utils = require('./utils');

// Capture 'flags' in the form "-f", "--flag", "--other-flag"
let flags = /(-{1,2}(\w)+(-*\w)*)(?=])/g;

// Capture optional arguments in the form "-a ARG", "-arg FOO", "--other-arg BAR"
let optArgs = /(-{1,2}(\w)+(-*\w)*) \w+(?=])/g;

// Capture positional arguments in the form "f", "foo", "bar-baz"
let posArgs = /(?<= )\w+(-\w*)*(?!]|\w)/g;

// Capture the beginning of a usage string up to the first argument
let usage = /usage: (\/)*\w+((\.\w+)|\/\w+)* /g;

const toName = (argString) => {
    let words = argString.split('-');
    let out = [];
    for (let word of words) {
        out.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
    }
    return out.join(' ');
};

exports.CommandLineHelpParser = class {
    constructor(usageString) {
        usageString = usageString.replace(usage, '');

        this.positionalArgs = [];
        this.optionalArgs = [];
        this.flags = [];

        let flagsList = usageString.match(flags);
        for (let flag of flagsList) {
            let newFlag = {};
            newFlag.raw = flag;
            newFlag.name = toName(utils.cleanLeadingCharacter(flag, '-'));
            this.flags.push(newFlag);
        }

        let optionalArgsList = usageString.match(optArgs);
        for (let arg of optionalArgsList) {
            let newOptArg = {};
            newOptArg.raw = arg;
            let parts = arg.split(' ');
            newOptArg.flag = parts[0];
            newOptArg.name = toName(utils.cleanLeadingCharacter(parts[1], '-'));
            this.optionalArgs.push(newOptArg);
        }

        let positionalArgsList = usageString.match(posArgs);
        for (let arg of positionalArgsList) {
            let newPosArg = {};
            newPosArg.raw = arg;
            newPosArg.name = toName(arg);
            this.positionalArgs.push(newPosArg);
        }
    }
};

if (require.main === module) {
    const ArgumentParser = require('argparse').ArgumentParser;
    const parser = new ArgumentParser({
        addHelp: true,
        description: 'A simple parser to process the output of command line tool help commands'
    });
    parser.addArgument(
        'test',
        {
            help: 'An arbitrary string to test the parser against'
        }
    );
    args = parser.parseArgs();
}