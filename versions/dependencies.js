#!/usr/bin/env node
/* eslint no-console: 0 */

const VERSIONS = require('./dependencies.json');

console.log('REACT_VERSION: ', VERSIONS.react);

module.exports = VERSIONS;
