import readPackageUp from 'read-pkg-up';
import assetsApi, { Asset } from '.';

const iconsInfo = readPackageUp.sync({ cwd: require.resolve('@talend/icons') });
const currentInfo = readPackageUp.sync({ cwd: __dirname });

describe('assets-api', () => {
	describe('getURL', () => {
		it('should return unpkg url', () => {
			const assetsPath = '/dist/svg-bundles/all.svg';
			const url = assetsApi.getURL(assetsPath, '@talend/icons', iconsInfo?.packageJson.version);
			expect(url).toBe(
				`https://unpkg.com/@talend/icons@${iconsInfo?.packageJson.version}${assetsPath}`,
			);
		});
		it('should use global getCDNUrl', () => {
			const assetsPath = '/package.json';
			const original = window.Talend.getCDNUrl;
			window.Talend.getCDNUrl = jest.fn(
				(info: Asset) => `https://mycdn.talend.com/${info.name}/${info.version}${info.path}`,
			);
			const url = assetsApi.getURL(
				assetsPath,
				'@talend/assets-api',
				currentInfo?.packageJson.version,
			);
			expect(url).toBe(
				`https://mycdn.talend.com/@talend/assets-api/${currentInfo?.packageJson.version}${assetsPath}`,
			);
			window.Talend.getCDNUrl = original;
		});
	});
});
