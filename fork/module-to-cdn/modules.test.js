/* eslint-disable no-param-reassign */
const {cachedGet, getModuleInfo, getAllVersions, getRangeEdgeVersions} = require('./cache');
const fn = require('.');
const modules = require('./modules.json');

const moduleNames = Object.keys(modules);

// backward compat
const bbt = {
    deepEqual: (a, b) => expect(a).toMatchObject(b),
    notDeepEqual: (a, b) => (b !== null ? expect(a).not.toMatchObject(b) : expect(a).not.toBe(b)),
    is: (a, b) => expect(a).toBe(b),
    truthy: a => expect(a).toBeTruthy(),
    true: a => expect(a).toBe(true),
    notThrowsAsync: async (test, data) => {
        try {
            await test();
        } catch (e) {
            expect(false).toBe(`${e.message}: ${data}`);
        }
    },
    pass: () => expect(true).toBe(true)
};

// https://stackoverflow.com/a/31625466/3052444
function isValidVarName(name) {
    try {
        if (name.includes('.')) {
            // E.g. ng.core would cause errors otherwise:
            name = name.split('.').join('_');
        }

        if (name.includes('-')) {
            name = `"${name}"`;
            // eslint-disable-next-line no-eval
            return eval(`(function() { a = {${name}:1}; a[${name}];}); true`);
        }

        if (name.includes('}')) {
            return false;
        }

        // eslint-disable-next-line no-eval
        return eval(`(function() { a = {${name}:1}; a.${name}; var ${name}; }); true`);
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function testCdnConfig(t, cdnConfig, importPath, version) {
    t.notDeepEqual(cdnConfig, null);

    t.is(cdnConfig.name, fn.getModuleName(importPath));
    t.truthy(cdnConfig.url);
    t.true(cdnConfig.url.includes(version));

    await t.notThrowsAsync(async () => {
        if (cdnConfig.url.endsWith('/')) {
            return;
        }

        let data;
        try {
            const response = await cachedGet(cdnConfig.url);
            data = response.data;
        } catch (error) {
            throw new Error(error.message);
        }

        if (cdnConfig.var) {
            t.true(isValidVarName(cdnConfig.var));

            const content = data.replace(/ /g, '');
            t.true(
                content.includes(`.${cdnConfig.var}=`) ||
                    content.includes(`["${cdnConfig.var}"]=`) ||
                    content.includes(`['${cdnConfig.var}']=`) ||
                    // Immutable 3 is clear, the script is global and just do Immutable =
                    content.includes(`${cdnConfig.var}=`) ||
                    content.includes(`function${cdnConfig.var}(`),
                `${cdnConfig.var} not found in the content ${cdnConfig.url}`
            );
        }
    }, cdnConfig.url);
}

async function testNextModule(t, importPath, env) {
    const moduleName = fn.getModuleName(importPath);
    const tags = getModuleInfo(moduleName)['dist-tags'];

    if (!tags.next) {
        return t.pass();
    }

    const nextVersion = tags.next;

    const cdnConfig = fn(moduleName, nextVersion, {env});

    if (!cdnConfig) {
        return t.pass(`no next support for ${moduleName}`);
    }

    return testCdnConfig(t, cdnConfig, moduleName, nextVersion);
}

function limit(m) {
    if (process.env.LIMIT) {
        return process.env.LIMIT.includes(`;${m};`);
    }

    return true;
}

describe('test modules.json limits', () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const importPath of moduleNames.filter(m => limit(m))) {
        const prodTest = () => {
            testNextModule(bbt, importPath, 'production');
        };
        const devTest = () => {
            testNextModule(bbt, importPath, 'development');
        };
        it(`${importPath}@next prod config`, prodTest);
        it(`${importPath}@next dev config`, devTest);

        const moduleName = fn.getModuleName(importPath);
        const allVersions = getAllVersions(moduleName);
        const versionRanges = Object.keys(modules[importPath].versions);
        const testVersions = [].concat(...versionRanges.map(getRangeEdgeVersions(allVersions)));
        describe.each(testVersions)(`prod: ${importPath}`, version => {
            // testModule(bbt, importPath, version, 'production');
            test(`@${version}`, () => {
                const cdnConfig = fn(importPath, version, {env: 'production'});
                expect(cdnConfig).not.toBe(null);
            });
        });
    }
});
