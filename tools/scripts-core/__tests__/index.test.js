/* eslint-disable no-console */
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import fs from 'fs';
import { rimrafSync } from 'rimraf';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = path.join(__dirname, 'fixture');
const bin = path.resolve(__dirname, '../src/index.js');

function getTmpDirectory(prefix) {
	const date = new Date();
	const tmp = path.join(
		__dirname,
		`tmp-${prefix}-${date.toLocaleDateString().replace(/\//g, '-')}`,
	);
	fs.cpSync(fixture, tmp, { recursive: true });
	return tmp;
}

describe('talend-scripts', () => {
	afterAll(() => {
		rimrafSync(path.join(__dirname, 'tmp*'), { glob: { silent: true } });
	});
	describe('build', () => {
		it('should by default put build output in lib folder', () => {
			const tmp = getTmpDirectory('build-lib');
			const output = spawnSync('node', [bin, 'build'], { cwd: tmp });
			const logs = output.stdout.toString();
			expect(output.error).toBeUndefined();
			expect(logs).toContain('CONFIGURATION -----');
			expect(logs).toContain('Running command: build With options: ');
			expect(logs).toContain('Talend scripts mode : production');
			expect(logs).toContain('Talend scripts configuration file found and loaded');
			expect(logs).toContain('RUN ------------');
			// expect(output.stderr.toString()).toBe('');
			fs.existsSync(path.join(tmp, 'lib', 'index.js'));
			fs.existsSync(path.join(tmp, 'lib', 'index.js.map'));
		});
		it('should exit with an error when declaration generation fails', () => {
			const tmp = getTmpDirectory('build-types-error');
			fs.writeFileSync(
				path.join(tmp, 'package.json'),
				JSON.stringify({
					private: true,
					name: '@talend/test-scripts-core',
					types: 'lib/invalid.d.ts',
				}),
			);
			fs.writeFileSync(
				path.join(tmp, 'tsconfig.build.json'),
				JSON.stringify({
					compilerOptions: { declaration: true, strict: true },
					include: ['src/**/*.ts'],
				}),
			);
			fs.writeFileSync(
				path.join(tmp, 'src/invalid.ts'),
				'const value: string = 1;\nexport default value;\n',
			);

			const output = spawnSync('node', [bin, 'build'], { cwd: tmp });

			expect(output.error).toBeUndefined();
			expect(output.status).toBe(1);
		});
	});
});
