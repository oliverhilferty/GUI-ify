const utils = require('./utils');

// Capture 'flags' in the form "-f", "--flag", "--other-flag"
const flags = /(-{1,2}(\w)+(-*\w)*)(?=])/g;

// Capture optional arguments in the form "-a ARG", "-arg FOO", "--other-arg BAR"
const optArgs = /(-{1,2}(\w)+(-*\w)*) \w+(?=])/g;

// Capture positional arguments in the form "f", "foo", "bar-baz"
const posArgs = /(?<= )\w+(-\w*)*(?!]|\w)/g;
// (?<= )                    | positive lookbehind for 'space' character (aka match must start with a space)
//       \w+                 | one or more word characters
//          (                | start of capture group
//           -\w*            | a hyphen character, followed by 0 or more word characters
//               )           | end of capture group
//                *          | match previous group 0 or more times
//                 (?!       | start of negative lookahead
//                    ]      | lookahead for closing square bracket character...
//                     |     | ...OR...
//                      \w   | any word character (aka match cannot end with closing square bracket or a word character)
//                        )  | end of negative lookahead

// Capture the beginning of a usage string up to the first argument
const usage = /usage: (\/)*\w+((\.\w+)|\/\w+)* /g;

exports.CommandLineHelpParser = class {
    constructor(usageString) {
        usageString = usageString.replace(usage, '');

        this.positionalArgs = [];
        this.optionalArgs = [];
        this.flags = [];

        const flagsList = usageString.match(flags);
        if (flagsList) {
            for (let flag of flagsList) {
                const newFlag = {};
                newFlag.raw = flag;
                newFlag.name = utils.toName(utils.cleanLeadingCharacter(flag, '-'));
                this.flags.push(newFlag);
            }
        }

        const optionalArgsList = usageString.match(optArgs);
        if (optionalArgsList) {
            for (let arg of optionalArgsList) {
                const newOptArg = {};
                newOptArg.raw = arg;
                const parts = arg.split(' ');
                newOptArg.flag = parts[0];
                newOptArg.name = utils.toName(utils.cleanLeadingCharacter(parts[1], '-'));
                this.optionalArgs.push(newOptArg);
            }
        }

        let positionalArgsList = usageString.match(posArgs);
        if (positionalArgsList) {
            for (let arg of positionalArgsList) {
                const newPosArg = {};
                newPosArg.raw = arg;
                newPosArg.name = utils.toName(arg);
                this.positionalArgs.push(newPosArg);
            }
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