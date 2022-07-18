/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { spawnSync } = require('child_process');
const { readFileSync } = require('fs');
const rimraf = require('rimraf');
const {
	getLockContent,
	getTmpDirectory,
	isMinorGt,
	isMinorLockGT,
	isMajorGT,
	isMajorLockGT,
	isSameVersion,
	isSameLockVersion,
	getVersionFromLock,
} = require('./utils');

const fixturePath = path.join(__dirname, 'fixture', 'basic');
const bin = path.resolve(__dirname, '..', 'bin', 'cli.js');
const origin = JSON.parse(readFileSync(path.join(fixturePath, 'package.json')));
let originLock;

const originSub = JSON.parse(
	readFileSync(path.join(fixturePath, 'packages', 'suba', 'package.json')),
);

describe.each(['package-lock.json', 'yarn.lock'])('talend-upgrade-deps %s', lock => {
	beforeEach(() => {
		originLock = getLockContent(fixturePath, lock);
	});
	afterAll(() => {
		rimraf.sync(path.join(__dirname, 'tmp-basic-*'));
	});

	it('should by default only do safe upgrade', () => {
		const tmp = getTmpDirectory('basic-default', fixturePath, lock);
		const output = spawnSync('node', [bin, '-v'], { cwd: tmp });
		const tmpLock = getLockContent(tmp, lock);
		expect(output.error).toBeUndefined();
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		const pkg = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		const pkgSub = JSON.parse(readFileSync(path.join(tmp, 'packages', 'suba', 'package.json')));
		expect(pkg.devDependencies.chokidar).toBe(origin.devDependencies.chokidar);
		expect(pkg.devDependencies.chokidar).toBe('2.1.8');
		expect(isMinorGt('chokidar', pkg, origin)).toBe(false);
		expect(isMinorGt('react', pkg, origin)).toBe(true);
		expect(isMinorGt('react-dom', pkg, origin)).toBe(true);
		// no update on this old version installed
		expect(isMinorLockGT('react', tmpLock, originLock)).toBe(true);
		expect(isMinorLockGT('react-dom', tmpLock, originLock)).toBe(true);
		// sub package should be also updated
		expect(isMinorGt('react', pkgSub, originSub)).toBe(true);
	});

	it('should support a --dry option where files are not updated', () => {
		const tmp = getTmpDirectory('basic-dry', fixturePath, lock);
		const output = spawnSync('node', [bin, '--dry'], { cwd: tmp });
		const tmpLock = getLockContent(tmp, lock);
		// the logs should show the need to update chokidar
		const logs = output.stdout.toString();
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		expect(logs).toContain('package.json using same requirements');
		expect(logs).toContain('check versions of');
		expect(output.error).toBeUndefined();
		const pkg = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		expect(pkg).toMatchObject(origin);
		expect(tmpLock).toMatchObject(originLock);
	});

	it('should support a --latest option', () => {
		const tmp = getTmpDirectory('basic-latest', fixturePath, lock);
		const output = spawnSync('node', [bin, '--latest'], { cwd: tmp });
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		const tmpLock = getLockContent(tmp, lock);
		const logs = output.stdout.toString();
		expect(logs).toContain('package.json using latest');
		expect(logs).toContain('"react-dom": "^16.6.0" => "');
		expect(logs).toContain('"react": "^16.6.0" => "');
		expect(logs).toContain('update all packages versions of');
		expect(output.error).toBeUndefined();

		const pkg = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		expect(isMajorGT('chokidar', pkg, origin)).toBe(true);
		expect(isMajorGT('react-dom', pkg, origin)).toBe(true);
		expect(isMajorGT('react', pkg, origin)).toBe(true);
		expect(isMajorLockGT('chokidar', tmpLock, originLock)).toBe(true);
		expect(isMajorLockGT('react-dom', tmpLock, originLock)).toBe(true);
		expect(isMajorLockGT('react', tmpLock, originLock)).toBe(true);
	});

	it('should support a --scope option', () => {
		const tmp = getTmpDirectory('basic-scope', fixturePath, lock);
		const output = spawnSync('node', [bin, '--scope=@talend'], { cwd: tmp });
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		const logs = output.stdout.toString();
		expect(logs).not.toContain('"chokidar"');
		expect(logs).not.toContain('"react-dom"');
		expect(logs).not.toContain('"react"');
		expect(output.error).toBeUndefined();

		const pkg = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		expect(isSameVersion('chokidar', pkg, origin)).toBe(true);
		expect(isSameVersion('react-dom', pkg, origin)).toBe(true);

		const tmpLock = getLockContent(tmp, lock);
		expect(isSameLockVersion('chokidar', tmpLock, originLock)).toBe(true);
		expect(isSameLockVersion('react-dom', tmpLock, originLock)).toBe(true);
	});

	it('should support a --starts-with option', () => {
		const tmp = getTmpDirectory('basic-startsWith', fixturePath, lock);
		const output = spawnSync('node', [bin, '--starts-with=@talend/scripts'], { cwd: tmp });
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		const logs = output.stdout.toString();
		expect(logs).not.toContain('"chokidar"');
		expect(logs).not.toContain('"react-dom"');
		expect(logs).not.toContain('"react"');
		expect(output.error).toBeUndefined();

		const pkg = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		expect(isSameVersion('chokidar', pkg, origin)).toBe(true);
		expect(isSameVersion('react', pkg, origin)).toBe(true);

		const tmpLock = getLockContent(tmp, lock);
		expect(isSameLockVersion('chokidar', tmpLock, originLock)).toBe(true);
		expect(isSameLockVersion('react', tmpLock, originLock)).toBe(true);
	});
});
