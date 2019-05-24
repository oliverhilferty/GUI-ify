/**
 * Get the string of arguments from a CLI's help string
 * @param {string} helpOutput
 * @returns {number | string}
 */
exports.extractUsageString = (helpOutput) => {
    let usageLines = helpOutput.split('\n');
    for (let line of usageLines) {
        if (line.includes('usage')) {
            return line;
        }
    }
    return -1;
};

/**
 * Removes leading characters from a string
 * @param {string} paramString
 * @param {string} character
 * @returns {string}
 */
exports.cleanLeadingCharacter = (paramString, character) => {
    while (paramString[0] === character) {
        paramString = paramString.slice(1);
    }
    return paramString;
};

/**
 * Split hyphenated string into words, capitalising first letter of each
 * @param {string} argString
 * @returns {string}
 */
exports.toName = (argString) => {
    let words = argString.split('-');
    let out = [];
    for (let word of words) {
        out.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
    }
    return out.join(' ');
};
