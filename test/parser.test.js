const describe = require('mocha').describe;
require('chai').should();
const CommandLineHelpParser = require('../parser').CommandLineHelpParser;


describe('Parser', function() {
    beforeEach('Init CommandLineHelpParser', function() {
        this.CLIParser = new CommandLineHelpParser();
    });

    it('generates an object with optional arguments, positional arguments, and flags fields', function() {
        const parsedString = this.CLIParser.parse('usage: grablio [-h] [-d DESTINATION] [-s SELECTOR] [-a ATTR] [-t] url');
        parsedString.should.include.keys('positionalArgs');
        parsedString.should.include.keys('optionalArgs');
        parsedString.should.include.keys('flags');
    })
});
