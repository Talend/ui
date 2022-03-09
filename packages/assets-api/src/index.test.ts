import { readPackageUpSync } from 'read-pkg-up';
import assetsApi from '.';

const iconsInfo = readPackageUpSync({ cwd: require.resolve('@talend/icons') });
const currentInfo = readPackageUpSync({ cwd: __dirname });

describe('assets-api', () => {
	describe('getURL', () => {
		it('should return unpkg url', () => {
			const assetsPath = '/dist/svg-bundles/all.svg';
			const url = assetsApi.getURL(assetsPath, '@talend/icons', iconsInfo?.packageJson.version);
			expect(url).toBe(
				`https://unpkg.com/@talend/icons@${iconsInfo?.packageJson.version}${assetsPath}`,
			);
		});
		it('should use global getCdnUrl', () => {
			const assetsPath = '/package.json';
			const url = assetsApi.getURL(
				assetsPath,
				'@talend/assets-api',
				currentInfo?.packageJson.version,
			);
			expect(url).toBe(
				`https://unpkg.com/@talend/assets-api@${currentInfo?.packageJson.version}${assetsPath}`,
			);
		});
	});
});
