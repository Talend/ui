#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const src = require('../src');

const dist = path.join(__dirname, '../dist/');
mkdirp.sync(dist);

const icons = Object.keys(src.svgs)
    .map(
        (key, index) =>
            `    ${index > 0 ? '|' : ''} 'talend-${key}'`,
    ).join('\n');

fs.writeFileSync(path.join(dist, 'index.d.ts'), `/// <reference types="typescript" />

export declare type IconName =
${icons}
    | string;
`);
