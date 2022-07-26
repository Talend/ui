/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { spawnSync } = require('child_process');
const { readFileSync } = require('fs');
const yarnpkg = require('@yarnpkg/lockfile');
const rimraf = require('rimraf');
const semver = require('semver');
const { getTmpDirectory } = require('./utils');

const fixturePath = path.join(__dirname, 'fixture', 'security');
const bin = path.resolve(__dirname, '..', 'bin', 'cli.js');

describe('talend-upgrade-deps --security', () => {
	afterAll(() => {
		rimraf.sync(path.join(__dirname, 'tmp-security-*'));
	});

	it('should fail when used with another option', async () => {
		// given
		const tmp = await getTmpDirectory('security-error', fixturePath);

		// when
		let output = spawnSync(
			'node',
			[bin, '--security=./security-conf-axios.json', '--scope=@talend'],
			{ cwd: tmp },
		);
		// then
		let err = output.stderr.toString();
		expect(err).toContain('Deps security fix mode is incompatible with "scope" option.');

		// when
		output = spawnSync(
			'node',
			[bin, '--security=./security-conf-axios.json', '--package=@talend/react-components'],
			{
				cwd: tmp,
			},
		);
		// then
		err = output.stderr.toString();
		expect(err).toContain('Deps security fix mode is incompatible with "package" option.');

		// when
		output = spawnSync(
			'node',
			[bin, '--security=./security-conf-axios.json', '--starts-with=@talend/react-'],
			{
				cwd: tmp,
			},
		);
		// then
		err = output.stderr.toString();
		expect(err).toContain('Deps security fix mode is incompatible with "starts-with" option.');

		// when
		output = spawnSync('node', [bin, '--security=./security-conf-axios.json', '--dry'], {
			cwd: tmp,
		});
		// then
		err = output.stderr.toString();
		expect(err).toContain('Deps security fix mode is incompatible with "dry" option.');

		// when
		output = spawnSync('node', [bin, '--security=./security-conf-axios.json', '--latest'], {
			cwd: tmp,
		});
		// then
		err = output.stderr.toString();
		expect(err).toContain('Deps security fix mode is incompatible with "latest" option.');
	});

	it('direct dep: should change compatible version in package.json', async () => {
		// given
		const tmp = await getTmpDirectory('security-direct', fixturePath);
		let pkgJson = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		let yarnLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString()).object;

		expect(pkgJson.dependencies.axios).toBe('^0.21.1');
		expect(yarnLock['axios@^0.21.1'].version).toBe('0.21.1');

		// when
		spawnSync('node', [bin, '--security=./conf/security-conf-axios.json'], {
			cwd: tmp,
		});

		// then
		pkgJson = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		yarnLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString()).object;
		expect(pkgJson.dependencies.axios).toBe('^0.21.2');
		expect(semver.gte(yarnLock['axios@^0.21.2'].version, '0.21.2')).toBe(true);

		const report = JSON.parse(readFileSync(path.join(tmp, 'talend-security-report.json')));
		const axiosReport = report['axios@^0.21.1'];
		expect(axiosReport.fixed).toBe('✅');
		expect(axiosReport.details).toContain('Upgraded package.json dependencies with axios@^0.21.2');
		expect(axiosReport.depType).toBe('Direct');
		expect(axiosReport.installed).toBe('0.21.1');
		expect(axiosReport.fixVersion).toBe('0.21.2');
	});

	xit('transitive dep: should remove it from yarn.lock with compatible version', async () => {
		// given
		const tmp = await getTmpDirectory('security-transitive-compatible', fixturePath);
		let pkgJson = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		let yarnLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString()).object;

		expect(pkgJson.dependencies.prompts).toBeUndefined();
		expect(yarnLock['prompts@^2.0.1'].version).toBe('2.4.1');

		// when
		spawnSync('node', [bin, '--security=./conf/security-conf-prompts.json'], {
			cwd: tmp,
		});

		// then
		pkgJson = JSON.parse(readFileSync(path.join(tmp, 'package.json')));
		yarnLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString()).object;
		expect(pkgJson.dependencies.prompts).toBeUndefined();
		expect(semver.gte(yarnLock['prompts@^2.0.1'].version, '2.4.1')).toBe(true);

		const report = JSON.parse(readFileSync(path.join(tmp, 'talend-security-report.json')));
		const promptsReport = report['prompts@^2.0.1'];
		expect(promptsReport.fixed).toBe('✅');
		expect(promptsReport.details).toContain('Removed entry with prompts@^2.0.1 in yarn.lock');
		expect(promptsReport.depType).toBe('Transitive');
		expect(promptsReport.installed).toBe('2.4.1');
		expect(promptsReport.fixVersion).toBe('2.4.2');
	});

	xit('transitive dep: should upgrade direct dep which is the top ancester in vulnerable hierarchy', async () => {
		// given
		const tmp = await getTmpDirectory('security-transitive-ancester', fixturePath);
		let yarnLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString()).object;

		expect(yarnLock['css-what@^3.2.1'].version).toBe('3.4.2');

		// when
		spawnSync('node', [bin, '--security=./conf/security-conf-css-what.json'], {
			cwd: tmp,
		});

		// then
		yarnLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString()).object;
		expect(yarnLock['css-what@^3.2.1']).toBeUndefined();

		const report = JSON.parse(readFileSync(path.join(tmp, 'talend-security-report.json')));
		const cssWhatReport = report['css-what@^3.2.1'];
		expect(cssWhatReport.fixed).toBe('✅');
		expect(
			cssWhatReport.details.some(phrase =>
				phrase.startsWith(
					'Upgraded package.json dev dependencies with @talend/scripts-preset-react-lib@',
				),
			),
		).toBe(true);
		expect(cssWhatReport.details).toContain('Removed entry with css-what@^3.2.1 in yarn.lock');
		expect(cssWhatReport.depType).toBe('Transitive');
		expect(cssWhatReport.installed).toBe('3.4.2');
		expect(cssWhatReport.fixVersion).toBe('5.0.1');
		expect(cssWhatReport.unresolved.length).toBe(0);
		expect(cssWhatReport.resolved.length).toBeGreaterThan(0);
	});

	it('transitive dep: not resolved for some hierarchies', async () => {
		// given
		const tmp = await getTmpDirectory('security-transitive-unresolved', fixturePath);
		let yarnLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString()).object;
		expect(yarnLock['glob-parent@^5.0.0']).toBeDefined();
		expect(yarnLock['glob-parent@^5.0.0'].version).toBe('5.1.2');

		// when
		spawnSync('node', [bin, '--security=./conf/security-conf-glob-parent.json'], {
			cwd: tmp,
		});

		// then
		yarnLock = yarnpkg.parse(readFileSync(path.join(tmp, 'yarn.lock')).toString()).object;
		expect(yarnLock['glob-parent@^5.0.0']).toBeDefined();
		expect(yarnLock['glob-parent@^5.0.0'].version).toBe('5.1.2');

		const report = JSON.parse(readFileSync(path.join(tmp, 'talend-security-report.json')));
		const globParentReport = report['glob-parent@^5.0.0'];
		expect(globParentReport.fixed).toBe('❌');
		expect(globParentReport.unresolved.length).toBeGreaterThan(0);
	});
});
