/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const https = require('https');
const child = require('child_process');
const semver = require('semver');
const mkdirp = require('mkdirp');

const CACHE_BASE_PATH = `${process.cwd()}/.test-cache`;

const CACHE_NPM_PATH = `${CACHE_BASE_PATH}/.npm-cache-info.json`;
const CACHE_NPM = {
    __last: Date.now()
};

if (fs.existsSync(CACHE_NPM_PATH)) {
    const cache = require(CACHE_NPM_PATH);
    if (Date.now() - cache.__last < 1000 * 60 * 60) {
        console.log('use cache on NPM');
        Object.assign(CACHE_NPM, cache);
    } else {
        console.log('reset NPM cache');
    }
}

const AXIOS_CACHE_PATH = path.resolve(CACHE_BASE_PATH, 'axios');

function httpGet(url, {retry} = {retry: 0}) {
    return new Promise((resolve, reject) => {
        https
            .get(url, response => {
                const result = {
                    status: response.statusCode,
                    data: ''
                };
                response.on('data', d => {
                    result.data += d;
                });
                response.on('end', () => {
                    resolve(result);
                });
            })
            .on('error', error => {
                if (retry < 3) {
                    const options = {retry: retry + 1};
                    httpGet(url, options).then(resolve).catch(reject);
                } else {
                    reject(error);
                }
            });
    });
}

function ensureCacheFolderExists() {
    if (!fs.existsSync(CACHE_BASE_PATH)) {
        console.log('Setup cache for testing');
        fs.mkdirSync(CACHE_BASE_PATH);
    }

    if (!fs.existsSync(AXIOS_CACHE_PATH)) {
        console.log(`Setup cache folder for response in ${AXIOS_CACHE_PATH}`);
        fs.mkdirSync(AXIOS_CACHE_PATH);
    }
}

function getInfo(url) {
    ensureCacheFolderExists();
    const info = {};
    const splitted = url.replace('https://unpkg.com/', '').split('/');
    const [packageAndVersion, inCase, ...restPath] = splitted;

    if (packageAndVersion.startsWith('@')) {
        const [n, version] = inCase.split('@');
        info.name = `${packageAndVersion}/${n}`;
        info.version = version;
        info.path = restPath.join('/');
    } else {
        const [n, version] = packageAndVersion.split('@');
        info.name = n;
        info.version = version;
        info.path = [inCase, ...restPath].join('/');
    }

    return info;
}

function getPathFromURL(url) {
    const info = getInfo(url);
    const resolved = path.resolve(AXIOS_CACHE_PATH, `${info.name}/${info.version}/${info.path}`);
    const root = AXIOS_CACHE_PATH.endsWith(path.sep)
        ? AXIOS_CACHE_PATH
        : AXIOS_CACHE_PATH + path.sep;
    if (!resolved.startsWith(root)) {
        throw new Error(`Refusing to use a cache path outside of ${AXIOS_CACHE_PATH}: ${url}`);
    }
    return resolved;
}

async function cachedGet(url) {
    ensureCacheFolderExists();

    const pathFromURL = getPathFromURL(url);
    if (fs.existsSync(pathFromURL)) {
        return Promise.resolve({data: fs.readFileSync(pathFromURL).toString()});
    }

    try {
        const response = await httpGet(url);
        if (process.env.DEBUG) {
            console.debug('downloaded', url);
        }

        mkdirp.sync(path.dirname(pathFromURL));
        fs.writeFileSync(pathFromURL, response.data);
        return response;
    } catch (error) {
        console.error('DownloadError', url, error.message);
        return Promise.reject(error);
    }
}

function isInCache(url) {
    return fs.existsSync(getPathFromURL(url));
}

const NPM_PACKAGE_NAME = /^(?:@[a-z0-9~][a-z0-9._~-]*\/)?[a-z0-9~][a-z0-9._~-]*$/;

// On Windows npm is an npm.cmd wrapper that cannot be launched without a shell:
// run npm's own CLI script with the current node binary instead.
function getNpmCommand(args) {
    if (process.platform === 'win32') {
        const npmCli = path.join(
            path.dirname(process.execPath),
            'node_modules',
            'npm',
            'bin',
            'npm-cli.js'
        );
        return {file: process.execPath, args: [npmCli, ...args]};
    }
    return {file: 'npm', args};
}

function getModuleInfo(moduleName) {
    if (typeof moduleName !== 'string' || !NPM_PACKAGE_NAME.test(moduleName)) {
        throw new Error(`Invalid npm package name: ${JSON.stringify(moduleName)}`);
    }

    ensureCacheFolderExists();

    if (!CACHE_NPM[moduleName]) {
        const npm = getNpmCommand(['info', '--json', moduleName]);
        const stdout = child.execFileSync(npm.file, npm.args, {encoding: 'utf8'});
        const info = JSON.parse(stdout);
        CACHE_NPM[moduleName] = {
            'dist-tags': info['dist-tags'],
            versions: info.versions
        };
        fs.writeFileSync(CACHE_NPM_PATH, JSON.stringify(CACHE_NPM));
    }

    return CACHE_NPM[moduleName];
}

function getAllVersions(moduleName) {
    return getModuleInfo(moduleName).versions;
}

function getRangeEdgeVersions(allVersions) {
    return function get(range) {
        const result = [];
        const values = allVersions.filter(version => semver.satisfies(version, range));

        if (values.length > 0) {
            result.push(values[0]);
        }

        if (values.length > 1) {
            result.push(values[values.length - 1]);
        }

        return result;
    };
}

module.exports = {
    cachedGet,
    isInCache,
    getModuleInfo,
    getAllVersions,
    getRangeEdgeVersions,
    getPathFromURL
};
