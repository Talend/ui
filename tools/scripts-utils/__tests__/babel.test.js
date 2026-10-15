const fs = require('fs');
const os = require('os');
const path = require('path');
const { getHash, getLockHash, getBabelLoaderOptions } = require('../src/babel');

describe('utils.babel', () => {
	let cwd;

	beforeEach(() => {
		cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'scripts-utils-babel-'));
		vi.spyOn(process, 'cwd').mockReturnValue(cwd);
	});

	afterEach(() => {
		vi.restoreAllMocks();
		fs.rmSync(cwd, { recursive: true, force: true });
	});

	it('should only inspect supported lockfiles when hashing a pnpm lockfile', () => {
		const content = 'lockfileVersion: 9.0\n';
		fs.writeFileSync(path.join(cwd, 'pnpm-lock.yaml'), content);
		const existsSync = vi.spyOn(fs, 'existsSync');

		expect(getLockHash()).toBe(getHash(content));
		expect(existsSync.mock.calls).toEqual([
			[path.join(cwd, 'package-lock.json')],
			[path.join(cwd, 'pnpm-lock.yaml')],
		]);
	});

	it('should find a pnpm lockfile in a parent directory', () => {
		const content = 'lockfileVersion: 9.0\n';
		const child = path.join(cwd, 'packages', 'example');
		fs.mkdirSync(child, { recursive: true });
		fs.writeFileSync(path.join(cwd, 'pnpm-lock.yaml'), content);
		vi.mocked(process.cwd).mockReturnValue(child);

		expect(getLockHash()).toBe(getHash(content));
	});

	it('should preserve npm lockfile precedence when both supported lockfiles exist', () => {
		const content = '{"lockfileVersion":3}\n';
		fs.writeFileSync(path.join(cwd, 'package-lock.json'), content);
		fs.writeFileSync(path.join(cwd, 'pnpm-lock.yaml'), 'lockfileVersion: 9.0\n');

		expect(getLockHash()).toBe(getHash(content));
	});

	it('should use the nearest supported lockfile', () => {
		const child = path.join(cwd, 'package');
		const content = 'lockfileVersion: 9.0\n';
		fs.mkdirSync(child);
		fs.writeFileSync(path.join(cwd, 'package-lock.json'), '{"lockfileVersion":3}\n');
		fs.writeFileSync(path.join(child, 'pnpm-lock.yaml'), content);
		vi.mocked(process.cwd).mockReturnValue(child);

		expect(getLockHash()).toBe(getHash(content));
	});

	it('should invalidate the Babel cache when the lockfile changes', () => {
		const lockfile = path.join(cwd, 'pnpm-lock.yaml');
		const config = { presets: ['@babel/preset-env'] };
		fs.writeFileSync(lockfile, 'lockfileVersion: 9.0\n');
		const options = getBabelLoaderOptions(config);

		expect(options).toMatchObject({
			...config,
			cacheDirectory: true,
			cacheCompression: false,
		});
		expect(getBabelLoaderOptions(config).cacheIdentifier).toBe(options.cacheIdentifier);

		fs.appendFileSync(lockfile, 'importers: {}\n');
		expect(getBabelLoaderOptions(config).cacheIdentifier).not.toBe(options.cacheIdentifier);
	});

	it('should report an error when no supported lockfile exists up to the filesystem root', () => {
		vi.spyOn(fs, 'existsSync').mockReturnValue(false);

		expect(getLockHash).toThrow(`can't find lock file from ${cwd} or in parent directories.`);
	});
});
