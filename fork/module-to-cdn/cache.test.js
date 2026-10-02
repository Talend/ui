import child from 'child_process';
import fs from 'fs';
import {afterEach, describe, expect, it, vi} from 'vitest';

const cache = require('./cache');

describe('cache', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('getModuleInfo', () => {
        it.each([
            'react;touch /tmp/pwned',
            'react && id',
            '$(id)',
            '`id`',
            'react|id',
            '-g',
            '../react',
            '',
            undefined
        ])('should reject invalid package name %j without running a command', name => {
            const execFileSync = vi.spyOn(child, 'execFileSync');
            const execSync = vi.spyOn(child, 'execSync');
            expect(() => cache.getModuleInfo(name)).toThrow('Invalid npm package name');
            expect(execFileSync).not.toHaveBeenCalled();
            expect(execSync).not.toHaveBeenCalled();
        });

        it.each(['lodash.get-valid_1', '@scope/pkg-name'])(
            'should call npm without a shell for %s',
            baseName => {
                // unique name so a persisted npm cache never short-circuits the call
                const name = `${baseName}-${Date.now()}`;
                vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
                const execFileSync = vi
                    .spyOn(child, 'execFileSync')
                    .mockReturnValue(
                        JSON.stringify({'dist-tags': {latest: '1.0.0'}, versions: ['1.0.0']})
                    );
                expect(cache.getModuleInfo(name).versions).toEqual(['1.0.0']);
                expect(execFileSync).toHaveBeenCalledWith('npm', ['info', '--json', name], {
                    encoding: 'utf8'
                });
            }
        );
    });

    describe('getModuleInfo on windows', () => {
        it('should launch the npm cli script with node, without a shell', () => {
            const name = `win-pkg-${Date.now()}`;
            const platform = Object.getOwnPropertyDescriptor(process, 'platform');
            Object.defineProperty(process, 'platform', {value: 'win32'});
            try {
                vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
                const execFileSync = vi
                    .spyOn(child, 'execFileSync')
                    .mockReturnValue(JSON.stringify({'dist-tags': {}, versions: ['1.0.0']}));
                cache.getModuleInfo(name);
                const [file, args, options] = execFileSync.mock.calls[0];
                expect(file).toBe(process.execPath);
                expect(args[0]).toMatch(/npm-cli\.js$/);
                expect(args.slice(1)).toEqual(['info', '--json', name]);
                expect(options.shell).toBeUndefined();
            } finally {
                Object.defineProperty(process, 'platform', platform);
            }
        });
    });

    describe('getPathFromURL', () => {
        it('should map an unpkg url inside the cache folder', () => {
            expect(cache.getPathFromURL('https://unpkg.com/react@18.0.0/umd/react.js')).toMatch(
                /\.test-cache[\\/]axios[\\/]react[\\/]18\.0\.0[\\/]umd[\\/]react\.js$/
            );
        });

        it.each([
            'https://unpkg.com/react@18.0.0/../../../../etc/evil',
            'https://unpkg.com/@scope/pkg@1.0.0/../../../../../evil',
            'https://unpkg.com/..@1.0.0/../../evil'
        ])('should refuse a url escaping the cache folder: %s', url => {
            expect(() => cache.getPathFromURL(url)).toThrow('outside of');
        });
    });
});
