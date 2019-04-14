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