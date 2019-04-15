const utils = require('./utils');

// Capture 'flags' in the form "-f", "--flag", "--other-flag"
const flags = /(-{1,2}(\w)+(-*\w)*)(?=])/g;

// Capture optional arguments in the form "-a ARG", "-arg FOO", "--other-arg BAR"
const optArgs = /(-{1,2}(\w)+(-*\w)*) \w+(?=])/g;

// Capture positional arguments in the form "f", "foo", "bar-baz"
const posArgs = /(?<= )\w+(-\w*)*(?!]|\w)/g;

// Capture the beginning of a usage string up to the first argument
const usage = /usage: (\/)*\w+((\.\w+)|\/\w+)* /g;

exports.CommandLineHelpParser = class {
    constructor(usageString) {
        usageString = usageString.replace(usage, '');

        this.positionalArgs = [];
        this.optionalArgs = [];
        this.flags = [];

        const flagsList = usageString.match(flags);
        for (let flag of flagsList) {
            const newFlag = {};
            newFlag.raw = flag;
            newFlag.name = utils.toName(utils.cleanLeadingCharacter(flag, '-'));
            this.flags.push(newFlag);
        }

        const optionalArgsList = usageString.match(optArgs);
        for (let arg of optionalArgsList) {
            const newOptArg = {};
            newOptArg.raw = arg;
            const parts = arg.split(' ');
            newOptArg.flag = parts[0];
            newOptArg.name = utils.toName(utils.cleanLeadingCharacter(parts[1], '-'));
            this.optionalArgs.push(newOptArg);
        }

        let positionalArgsList = usageString.match(posArgs);
        for (let arg of positionalArgsList) {
            const newPosArg = {};
            newPosArg.raw = arg;
            newPosArg.name = utils.toName(arg);
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