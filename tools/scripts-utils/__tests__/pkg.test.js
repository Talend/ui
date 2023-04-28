/* eslint-disable no-console */
import path from 'path';
import utils from '../src';

describe('utils.pkg', () => {
	const globalProcessCwd = global.process.cwd;
	const globalConsoleLog = console.log;
	const globalConsoleError = console.error;
	beforeEach(() => {
		global.console.log = jest.fn();
		global.console.error = jest.fn();
	});
	afterEach(() => {
		global.process.cwd = globalProcessCwd;
		global.console.log = globalConsoleLog;
		global.console.error = globalConsoleError;
	});
	describe('getPackageType', () => {
		it('should detect library', () => {
			global.process.cwd = () => path.join('./__tests__/fixtures/library');
			const result = utils.pkg.getPackageType();
			expect(result.isLib).toBe(true);
			expect(result.isApp).toBe(false);
		});
		it('should detect app', () => {
			global.process.cwd = () => path.join('./__tests__/fixtures/app');
			const result = utils.pkg.getPackageType();
			expect(result.isApp).toBe(true);
			expect(result.isLib).toBe(false);
		});
		it('should detect express', () => {
			global.process.cwd = () => path.join('./__tests__/fixtures/express');
			const result = utils.pkg.getPackageType();
			expect(result.isNodeExpress).toBe(true);
		});
	});
	describe('checkPackageIsInstalled', () => {
		it('should no throw if pkg is installed', () => {
			expect(utils.pkg.checkPackageIsInstalled('jest'));
		});
		it('should throw if pkg is not installed', () => {
			const shouldThrow = () => utils.pkg.checkPackageIsInstalled('do-not-exists');
			expect(shouldThrow).toThrow();
		});
	});
	describe('hasDependencies', () => {
		it('should check in package.dependencies', () => {
			const pkg = { dependencies: { foo: '1.0.0' } };
			expect(utils.pkg.hasDependencies(pkg, 'foo')).toBe(true);
			expect(utils.pkg.hasDependencies(pkg, 'bar')).toBe(false);
		});
		it('should check in package.devDependencies', () => {
			const pkg = { devDependencies: { foo: '1.0.0' } };
			expect(utils.pkg.hasDependencies(pkg, 'foo')).toBe(true);
			expect(utils.pkg.hasDependencies(pkg, 'bar')).toBe(false);
		});
		it('should check in package.peerDependencies', () => {
			const pkg = { peerDependencies: { foo: '1.0.0' } };
			expect(utils.pkg.hasDependencies(pkg, 'foo')).toBe(true);
			expect(utils.pkg.hasDependencies(pkg, 'bar')).toBe(false);
		});
	});
});
