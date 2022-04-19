const validate = require('validate-npm-package-name');
const modules = require('./modules.json');
const fn = require('.');
const {parseToSemverIfPossible} = require('./version');
const {cachedGet, getModuleInfo, getAllVersions, getRangeEdgeVersions} = require('./cache');

/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

// backward compat
const t = {
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

async function testModule(t, moduleName, version, env) {
    const cdnConfig = fn(moduleName, version, {env});

    await testCdnConfig(t, cdnConfig, moduleName, version);
}

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
async function testCdnConfig(t, cdnConfig, moduleName, version) {
    t.notDeepEqual(cdnConfig, null);

    t.is(cdnConfig.name, fn.getModuleName(moduleName));
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

async function testNextModule(t, moduleName, env) {
    const tags = getModuleInfo(moduleName)['dist-tags'];

    if (!tags.next) {
        return t.pass();
    }

    const nextVersion = tags.next;

    const cdnConfig = fn(moduleName, nextVersion, {env});

    if (!cdnConfig) {
        return t.pass(`no next support for ${moduleName}`);
    }

    await testCdnConfig(t, cdnConfig, moduleName, nextVersion);
}

const moduleNames = Object.keys(modules);

describe('module-to-cdn', () => {
    it('basic', () => {
        t.deepEqual(fn('react', '15.0.0', {env: 'development'}), {
            name: 'react',
            var: 'React',
            url: 'https://unpkg.com/react@15.0.0/dist/react.js',
            version: '15.0.0',
            path: '/dist/react.js',
            stylePath: undefined,
            styleUrl: undefined
        });
    });

    it('getAllModules', () => {
        t.deepEqual(fn.getAllModules(), modules);
    });

    it('unpkg', () => {
        t.is(
            fn.unpkg({
                name: 'react',
                version: '15.0.0',
                path: '/foo/bar'
            }),
            'https://unpkg.com/react@15.0.0/foo/bar'
        );
    });

    it('unknown module', () => {
        t.is(fn('qwerty', '1.0.0'), null);
    });

    it('default to development', () => {
        t.deepEqual(fn('react', '15.0.0', {env: 'development'}), fn('react', '15.0.0'));
        t.notDeepEqual(fn('react', '15.0.0', {env: 'production'}), fn('react', '15.0.0'));
    });

    it('out of range module', () => {
        t.is(fn('react', '0.10.0'), null);
    });

    it('module not installed', () => {
        t.deepEqual(fn('react-dom', '15.0.0', {env: 'development'}), {
            name: 'react-dom',
            var: 'ReactDOM',
            url: 'https://unpkg.com/react-dom@15.0.0/dist/react-dom.js',
            version: '15.0.0',
            path: '/dist/react-dom.js',
            stylePath: undefined,
            styleUrl: undefined
        });
    });

    it('should resolve complex npm version as a module', () => {
        t.deepEqual(fn('angular', 'npm:@xlts.dev/angular@1.8.7'), {
            name: 'angular',
            var: 'angular',
            url: 'https://unpkg.com/angular@1.8.7/angular.js',
            version: '1.8.7',
            path: '/angular.js',
            stylePath: undefined,
            styleUrl: undefined
        });
    });

    describe('version', () => {
        it('should handle parsing of simple semver version', () => {
            t.is(parseToSemverIfPossible('1.2.3'), '1.2.3');
            t.is(parseToSemverIfPossible('^1.2.3'), '1.2.3');
            t.is(parseToSemverIfPossible('=1.2.3'), '1.2.3');
            t.is(parseToSemverIfPossible('>=1.2.3'), '1.2.3');
        });
        it('should handle parsing of complex npm version', () => {
            t.is(parseToSemverIfPossible('npm:@xlts.dev/angular@1.8.7'), '1.8.7');
            t.is(parseToSemverIfPossible('npm:@xlts.dev/angular@^1.8.7'), '1.8.7');
            t.is(
                parseToSemverIfPossible('git+https://github.com/Talend/sunchoke.git#2.1.1'),
                '2.1.1'
            );
        });
        it('should NOT handle parsing of github urls without tags', () => {
            t.is(
                parseToSemverIfPossible(
                    'https://github.com/zhaozhiming/moment-jdateformatparser.git'
                ),
                'https://github.com/zhaozhiming/moment-jdateformatparser.git'
            );
        });
    });
});

function limit(m) {
    if (process.env.LIMIT) {
        return process.env.LIMIT.includes(`;${m};`);
    }

    return true;
}

// eslint-disable-next-line no-restricted-syntax
for (const importPath of moduleNames.filter(m => limit(m))) {
    const {validForNewPackages} = validate(importPath);

    const prodTest = () => {
        testNextModule(t, importPath, 'production');
    };
    const devTest = () => {
        testNextModule(t, importPath, 'development');
    };
    if (!validForNewPackages) {
        describe('invalid package name', () => {
            xit(`prod: ${importPath}@next`, prodTest);
            xit(`dev: ${importPath}@next`, devTest);
        });
    } else {
        describe('valid package name', () => {
            it(`prod: ${importPath}@next`, prodTest);
            it(`dev: ${importPath}@next`, devTest);
        });

        const moduleName = fn.getModuleName(importPath);
        const allVersions = getAllVersions(moduleName);
        const versionRanges = Object.keys(modules[importPath].versions);
        const testVersions = [].concat(...versionRanges.map(getRangeEdgeVersions(allVersions)));
        describe.each(testVersions)('prod: $importPath @ $version', version => {
            testModule(t, moduleName, version, 'production');
            testModule(t, moduleName, version, 'development');
        });
    }
}
