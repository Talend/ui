/* eslint-disable no-console */
import path from 'path';
import utils from '../src';

describe('utils.path', () => {
	let plateform;
	beforeEach(() => {
		plateform = global.process.plateform;
	});
	afterEach(() => {
		global.process.plateform = plateform;
	});
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
		it('should', () => {});
	});
	describe('getDirName', () => {
		it('should', () => {});
	});
	describe('getAbsolutePath', () => {
		it('should', () => {});
	});
	describe('resolveBin', () => {
		it('should', () => {});
	});
});
