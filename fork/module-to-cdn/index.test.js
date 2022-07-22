const modules = require('./modules.json');
const fn = require('.');
const {parseToSemverIfPossible} = require('./version');
const helpers = require('@talend/module-to-cdn/test-helpers');

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
    it('should respect style patterns', () => {
        helpers.assertStyleVersionPatterns(modules);
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
