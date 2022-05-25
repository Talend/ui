const semver = require('semver');

/*
 * Allow to parse complex package.json version requirements such as npm:@xlts.dev/angular@1.8.7
 */
function parseToSemverIfPossible(version) {
    const parsedVersion = semver.coerce(version)?.version;
    return semver.valid(parsedVersion) ? parsedVersion : version;
}

module.exports = {
    parseToSemverIfPossible
};
