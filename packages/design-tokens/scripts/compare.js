#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const [, , ...args] = process.argv;

if (args.length !== 2) {
    console.error('You must pass two files to be able to compare them!');
    process.exit(1);
}

const pathA = path.resolve(args[0]);
if (!fs.existsSync(pathA)) {
    console.error(`File #1 ${pathA} not found`);
    process.exit(1);
}

const pathB = path.resolve(args[1]);
if (!fs.existsSync(pathB)) {
    console.error(`File #2 ${pathB} not found`);
    process.exit(1);
}

const bufferA = fs.readFileSync(pathA);
const bufferB = fs.readFileSync(pathB);

Array.prototype.diff = function(arr2) {
    return this.filter(x => !arr2.includes(x));
};

Array.prototype.duplicates = function() {
    return this.filter((item, index) => this.indexOf(item) !== index);
};

function getKeys(buffer) {
    const keys = [];
    const re = /(--coral-(.*)):/gi;
    while ((result = re.exec(buffer.toString()))) {
        keys.push(result[1]);
    }
    return keys;
}

const bufferAKeys = getKeys(bufferA);
const bufferBKeys = getKeys(bufferB);

const duplicatesA = bufferAKeys.duplicates();
const duplicatesB = bufferBKeys.duplicates();

const diffBfromA = [...new Set(bufferAKeys.diff(bufferBKeys))];
const diffAfromB = [...new Set(bufferBKeys.diff(bufferAKeys))];

let exitCode = 0;

if (duplicatesA.length) {
    console.warn('Duplicate tokens in file #1');
    console.table(duplicatesA);
    exitCode = 1;
}

if (duplicatesB.length) {
    console.warn('Duplicate tokens in file #2');
    console.table(duplicatesB);
    exitCode = 1;
}

if (diffBfromA.length || diffAfromB.length) {
    console.error('Missing tokens in files #1 and #2');
    console.table([{ 'File #1': diffAfromB }, { 'File #2': diffBfromA }]);
    exitCode = 1;
}

process.exit(exitCode);
