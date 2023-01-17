/* eslint-disable no-console */
import path from 'path';
import utils from '../src';

describe('utils.path', () => {
	describe('hereRelative', () => {
		it('should', () => {
			expect(utils.path.hereRelative(process.cwd(), './package.json')).toBe('./package.json');
		});
	});
	describe('getPkgRootPath', () => {
		it('should', () => {
			expect(utils.path.getPkgRootPath('@talend/scripts-utils')).toMatch(
				/ui\/tools\/scripts-utils/,
			);
		});
	});
	describe('hereRelative', () => {
		it('should', () => {
			expect(utils.path.hereRelative(__dirname, 'fixtures')).toBe('./__tests__/fixtures');
		});
	});
	describe('getDirName', () => {
		it('should', () => {
			expect(utils.path.getDirName('file:///C:/path/')).toBe('/C:');
		});
	});
	describe('getAbsolutePath', () => {
		it('should not change if already absolute', () => {
			expect(utils.path.getAbsolutePath('/foo/bar')).toBe('/foo/bar');
		});
		it('should append process.cwd else', () => {
			expect(utils.path.getAbsolutePath('./foo/bar')).toMatch(/\/foo\/bar/);
		});
	});
	describe('resolveBin', () => {
		it('should', () => {
			const jest = utils.path.resolveBin('jest');
			expect(jest).toMatch(/\/node_modules\/jest\//);
		});
	});
});
