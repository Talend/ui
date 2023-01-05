/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const path = require('path');
const cpx = require('cpx2');
const { spawnSync } = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');

const fixture = path.join(__dirname, 'fixture');
const bin = path.resolve(__dirname, 'index.js');

function getTmpDirectory(prefix) {
	const date = new Date();
	const tmp = path.join(
		__dirname,
		`tmp-${prefix}-${date.toLocaleDateString().replace(/\//g, '-')}`,
	);
	cpx.copySync(path.join(fixture, '**'), tmp);
	return tmp;
}

describe('talend-scripts', () => {
	afterAll(() => {
		rimraf.sync(path.join(__dirname, 'tmp*'));
	});
	describe('build:lib:umd', () => {
		it('should by default create a dist folder', () => {
			const tmp = getTmpDirectory('build-lib-umd');
			const output = spawnSync('node', [bin, 'build:lib:umd'], { cwd: tmp });
			const logs = output.stdout.toString();
			expect(output.error).toBeUndefined();
			expect(logs).toContain('CONFIGURATION -----');
			expect(logs).toContain('Running command: build:lib:umd With options: ');
			expect(logs).toContain('Talend scripts mode : production');
			expect(logs).toContain('Talend scripts configuration file found and loaded');
			expect(logs).toContain('RUN ------------');
			expect(output.stderr.toString()).toBe('');
			fs.existsSync(path.join(tmp, 'dist', 'TalendTestScriptsCore.min.js'));
			fs.existsSync(path.join(tmp, 'dist', 'TalendTestScriptsCore.min.js.dependencies.json'));
			fs.existsSync(path.join(tmp, 'dist', 'TalendTestScriptsCore.min.js.map'));
		});
	});
	describe('build:lib', () => {
		it('should by default put build output in lib folder', () => {
			const tmp = getTmpDirectory('build-lib');
			const output = spawnSync('node', [bin, 'build:lib'], { cwd: tmp });
			const logs = output.stdout.toString();
			expect(output.error).toBeUndefined();
			expect(logs).toContain('CONFIGURATION -----');
			expect(logs).toContain('Running command: build:lib With options: ');
			expect(logs).toContain('Talend scripts mode : production');
			expect(logs).toContain('Talend scripts configuration file found and loaded');
			expect(logs).toContain('RUN ------------');
			expect(output.stderr.toString()).toBe('');
			fs.existsSync(path.join(tmp, 'lib', 'index.js'));
			fs.existsSync(path.join(tmp, 'lib', 'index.js.map'));
		});
	});
});
