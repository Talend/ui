/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { spawnSync } = require('child_process');
const { readFileSync } = require('fs');
const yarnpkg = require('@yarnpkg/lockfile');
const rimraf = require('rimraf');
const {
	getTmpDirectory,
	isMinorGt,
	isMinorLockGT,
	isMajorGT,
	isMajorLockGT,
	isSameVersion,
	isSameLockVersion,
} = require('./utils');

const fixturePath = path.join(__dirname, 'fixture', 'basic');
const bin = path.resolve(__dirname, '..', 'bin', 'cli.js');
const origin = JSON.parse(readFileSync(path.join(fixturePath, 'package.json')));
const originLock = yarnpkg.parse(
	readFileSync(path.join(fixturePath, 'yarn-template.lock')).toString(),
);
const originSub = JSON.parse(
	readFileSync(path.join(fixturePath, 'packages', 'suba', 'package.json')),
);

describe('talend-upgrade-deps', () => {
	afterAll(() => {
		rimraf.sync(path.join(__dirname, 'tmp-basic-*'));
	});

	it('should by default only do safe upgrade', () => {
		const tmp = getTmpDirectory('basic-default', fixturePath);
		const output = spawnSync('node', [bin, '-v'], { cwd: tmp });
		const tmpLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString());
		expect(output.error).toBeUndefined();
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		const pkg = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		const pkgSub = JSON.parse(readFileSync(path.join(tmp, 'packages', 'suba', 'package.json')));
		expect(pkg.devDependencies.chokidar).not.toBe(origin.devDependencies.chokidar);
		expect(pkg.devDependencies.chokidar).toBe('^2.1.8');
		expect(isMinorGt('chokidar', pkg, origin)).toBe(true);
		expect(isMinorGt('react-dom', pkg, origin)).toBe(true);
		expect(isMinorGt('@talend/react-components', pkg, origin)).toBe(true);
		expect(isMinorGt('@talend/react-containers', pkg, origin)).toBe(true);
		expect(isMinorGt('@talend/scripts-core', pkg, origin)).toBe(true);
		// no update on this old version installed
		expect(isMinorLockGT('chokidar', tmpLock, originLock)).toBe(false);
		expect(isMinorLockGT('react-dom', tmpLock, originLock)).toBe(true);
		expect(isMinorLockGT('@talend/react-components', tmpLock, originLock)).toBe(true);
		expect(isMinorLockGT('@talend/react-containers', tmpLock, originLock)).toBe(true);
		expect(isMinorLockGT('@talend/scripts-core', tmpLock, originLock)).toBe(true);
		// sub package should be also updated
		console.error(pkgSub, originSub);
		expect(isMinorGt('react', pkgSub, originSub)).toBe(true);
	});

	it('should support a --dry option where files are not updated', () => {
		const tmp = getTmpDirectory('basic-dry', fixturePath);
		const output = spawnSync('node', [bin, '--dry'], { cwd: tmp });
		const tmpLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString());
		// the logs should show the need to update chokidar
		const logs = output.stdout.toString();
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		expect(logs).toContain('package.json using same requirements');
		expect(logs).toContain('"chokidar": "^2.1.0" => "^2.1.8"');
		expect(logs).toContain('"@talend/react-components": "^6.30.0" => ');
		expect(logs).toContain('"@talend/react-containers": "^6.30.0" => ');
		expect(logs).toContain('"@talend/scripts-core": "^9.0.0" => ');
		expect(logs).toContain('check versions of');
		expect(output.error).toBeUndefined();
		const pkg = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		expect(pkg).toMatchObject(origin);
		expect(tmpLock).toMatchObject(originLock);
	});

	it('should support a --latest option', () => {
		const tmp = getTmpDirectory('basic-latest', fixturePath);
		const output = spawnSync('node', [bin, '--latest'], { cwd: tmp });
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		const tmpLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString());
		const logs = output.stdout.toString();
		expect(logs).toContain('package.json using latest');
		expect(logs).toContain('"chokidar": "^2.1.0" => "');
		expect(logs).toContain('"react-dom": "^16.0.0" => "');
		expect(logs).toContain('"react": "16.0.0" => "');
		expect(logs).toContain('"@talend/react-components": "^6.30.0" => "');
		expect(logs).toContain('"@talend/react-containers": "^6.30.0" => "');
		expect(logs).toContain('"@talend/scripts-core": "^9.0.0" => "');
		expect(logs).toContain('"react": "16.0.0" => "');
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
		const tmp = getTmpDirectory('basic-scope', fixturePath);
		const output = spawnSync('node', [bin, '--scope=@talend'], { cwd: tmp });
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		const logs = output.stdout.toString();
		expect(logs).not.toContain('"chokidar"');
		expect(logs).not.toContain('"react-dom"');
		expect(logs).not.toContain('"react"');
		expect(logs).toContain('"@talend/react-components": "^6.30.0" => "');
		expect(logs).toContain('"@talend/react-containers": "^6.30.0" => "');
		expect(logs).toContain('"@talend/scripts-core": "^9.0.0" => "');
		expect(output.error).toBeUndefined();

		const pkg = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		expect(isSameVersion('chokidar', pkg, origin)).toBe(true);
		expect(isSameVersion('react-dom', pkg, origin)).toBe(true);
		expect(isMinorGt('@talend/react-components', pkg, origin)).toBe(true);
		expect(isMinorGt('@talend/react-containers', pkg, origin)).toBe(true);
		expect(isMinorGt('@talend/scripts-core', pkg, origin)).toBe(true);

		const tmpLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString());
		expect(isSameLockVersion('chokidar', tmpLock, originLock)).toBe(true);
		expect(isSameLockVersion('react-dom', tmpLock, originLock)).toBe(true);
		expect(isMinorLockGT('@talend/react-components', tmpLock, originLock)).toBe(true);
		expect(isMinorLockGT('@talend/react-containers', tmpLock, originLock)).toBe(true);
		expect(isMinorLockGT('@talend/scripts-core', tmpLock, originLock)).toBe(true);
	});

	it('should support a --starts-with option', () => {
		const tmp = getTmpDirectory('basic-startsWith', fixturePath);
		const output = spawnSync('node', [bin, '--starts-with=@talend/scripts'], { cwd: tmp });
		const err = output.stderr.toString();
		if (err) {
			console.error(err);
		}
		const logs = output.stdout.toString();
		expect(logs).not.toContain('"chokidar"');
		expect(logs).not.toContain('"react-dom"');
		expect(logs).not.toContain('"react"');
		expect(logs).not.toContain('"@talend/react-components": "^6.30.0" => "');
		expect(logs).not.toContain('"@talend/react-containers": "^6.30.0" => "');
		expect(logs).toContain('"@talend/scripts-core": "^9.0.0" => "');
		expect(output.error).toBeUndefined();

		const pkg = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		expect(isSameVersion('chokidar', pkg, origin)).toBe(true);
		expect(isSameVersion('react', pkg, origin)).toBe(true);
		expect(isSameVersion('@talend/react-components', pkg, origin)).toBe(true);
		expect(isSameVersion('@talend/react-containers', pkg, origin)).toBe(true);
		expect(isMinorGt('@talend/scripts-core', pkg, origin)).toBe(true);

		const tmpLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString());
		expect(isSameLockVersion('chokidar', tmpLock, originLock)).toBe(true);
		expect(isSameLockVersion('react', tmpLock, originLock)).toBe(true);
		expect(isSameLockVersion('@talend/react-components', tmpLock, originLock)).toBe(true);
		expect(isSameLockVersion('@talend/react-containers', tmpLock, originLock)).toBe(true);
		expect(isMinorLockGT('@talend/scripts-core', tmpLock, originLock)).toBe(true);
	});
});
