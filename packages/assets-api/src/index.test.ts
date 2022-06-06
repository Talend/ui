import readPackageUp from 'read-pkg-up';
import assetsApi, { Asset } from '.';

const iconsInfo = readPackageUp.sync({ cwd: require.resolve('@talend/icons') });
const currentInfo = readPackageUp.sync({ cwd: __dirname });
const bundlePath = '/dist/svg-bundles/all.svg';

describe('assets-api', () => {
	describe('getURL', () => {
		afterEach(() => {
			jest.restoreAllMocks();
		});

		it('should return unpkg url', () => {
			const url = assetsApi.getURL(bundlePath, '@talend/icons', iconsInfo?.packageJson.version);
			expect(url).toBe(
				`https://unpkg.com/@talend/icons@${iconsInfo?.packageJson.version}${bundlePath}`,
			);
		});

		it('should return /cdn url', () => {
			const original = window.Talend.CDN_URL;
			window.Talend.CDN_URL = '/cdn';
			const url = assetsApi.getURL(bundlePath, '@talend/icons', iconsInfo?.packageJson.version);
			expect(url).toBe(`/cdn/@talend/icons/${iconsInfo?.packageJson.version}${bundlePath}`);
			window.Talend.CDN_URL = original;
		});

		it('should prevent // as start url', () => {
			const original = window.Talend.CDN_URL;
			window.Talend.CDN_URL = '/cdn';
			const mockedBaseElement = { getAttribute: jest.fn().mockReturnValueOnce('/') };
			// @ts-ignore
			jest.spyOn(document, 'querySelector').mockImplementation(() => mockedBaseElement);
			const url = assetsApi.getURL(bundlePath, '@talend/icons', iconsInfo?.packageJson.version);
			expect(url).toBe(`/cdn/@talend/icons/${iconsInfo?.packageJson.version}${bundlePath}`);
			window.Talend.CDN_URL = original;
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
		it('should use meta to override the value', () => {
			const assetsPath = '/package.json';
			const original = window.Talend.getCDNUrl;
			window.Talend.getCDNUrl = jest.fn(
				(info: Asset) => `https://mycdn.talend.com/${info.name}/${info.version}${info.path}`,
			);
			const meta = document.createElement('meta');
			meta.setAttribute('name', '@talend/assets-api');
			meta.setAttribute('content', '0.0.0');
			document.head.appendChild(meta);
			const url = assetsApi.getURL(
				assetsPath,
				'@talend/assets-api',
				currentInfo?.packageJson.version,
			);
			expect(url).toBe(`https://mycdn.talend.com/@talend/assets-api/0.0.0${assetsPath}`);
			window.Talend.getCDNUrl = original;
			document.head.removeChild(meta);
		});
	});
});
