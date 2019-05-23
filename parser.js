const utils = require('./utils');

// Capture 'flags' in the form "-f", "--flag", "--other-flag"
const flagsRegEx = /(-{1,2}(\w)+(-*\w)*)(?=])/g;
// TODO: Annotate these regular expressions

// Capture optional arguments in the form "-a ARG", "-arg FOO", "--other-arg BAR"
const optArgsRegEx = /(-{1,2}(\w)+(-*\w)*) \w+(?=])/g;
// TODO: Annotate these regular expressions

// Capture positional arguments in the form "f", "foo", "bar-baz"
const posArgsRegEx = /(?<= )\w+(-\w*)*(?!]|\w)/g;
// (?<= )                  | positive lookbehind for 'space' character (aka match must start with a space)
//       \w+               | one or more word characters
//          (              | start of capture group
//           -\w*          | a hyphen character, followed by 0 or more word characters
//               )         | end of capture group
//                *        | match previous group 0 or more times
//                 (?!     | start of negative lookahead
//                    ]    | lookahead for closing square bracket character...
//                     |   | ...OR...
//                      \w | any word character (aka match cannot end with closing square bracket or a word character)
//                        )| end of negative lookahead

// Capture the beginning of a usage string up to the first argument
const usageRegEx = /usage: (\/)*\w+((\.\w+)|\/\w+)* /g;
// usage:                          | the string 'usage: '
//        (\/)*                    | 0 or more '/' characters
//             \w+                 | 1 or more word characters
//                (                | start of capture group
//                 (\.\w+)         | a period character, followed by 1 or more word characters...
//                        |        | ..OR..
//                         \/\w+   | ..a forward slash, followed by 1 or more word characters
//                              )* | end capture group, match 0 or more times
//                                 | a space (' ')

class CommandLineHelpParser {
    parse = (usageString) => {
        usageString = usageString.replace(usageRegEx, '');

        const positionalArgs = [];
        const optionalArgs = [];
        const flags = [];

        const flagsList = usageString.match(flagsRegEx);
        if (flagsList) {
            for (let flag of flagsList) {
                const newFlag = {};
                newFlag.raw = flag;
                newFlag.name = utils.toName(utils.cleanLeadingCharacter(flag, '-'));
                flags.push(newFlag);
            }
        }

        const optionalArgsList = usageString.match(optArgsRegEx);
        if (optionalArgsList) {
            for (let arg of optionalArgsList) {
                const newOptArg = {};
                newOptArg.raw = arg;
                const parts = arg.split(' ');
                newOptArg.flag = parts[0];
                newOptArg.name = utils.toName(utils.cleanLeadingCharacter(parts[1], '-'));
                optionalArgs.push(newOptArg);
            }
        }

        let positionalArgsList = usageString.match(posArgsRegEx);
        if (positionalArgsList) {
            for (let arg of positionalArgsList) {
                const newPosArg = {};
                newPosArg.raw = arg;
                newPosArg.name = utils.toName(arg);
                positionalArgs.push(newPosArg);
            }
        }

        return {
            positionalArgs: positionalArgs,
            optionalArgs: optionalArgs,
            flags: flags
        }
    }
}
exports.CommandLineHelpParser = CommandLineHelpParser;

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
    const cliParser = new CommandLineHelpParser();
    const parsedString = cliParser.parse(args.test);
    console.log(parsedString);
}