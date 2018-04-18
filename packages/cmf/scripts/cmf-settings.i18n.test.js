const path = require('path');
const process = require('process');
const fs = require('fs');

jest.mock('mkdirp', () => ({
	sync: () => {},
}));

jest.mock('./getJSON', () => ({
	getJSON: path => {
		if (path.includes('ns1')) {
			return { key1: 'bar', oldKey: 'bar' };
		}

		if (path.includes('foo')) {
			return {
				label: {
					i18n: {
						key: 'ns1:KEY1',
						options: {
							defaultValue: 'key1',
						},
					},
				},
				message: {
					i18n: {
						key: 'ns1:KEY2',
						options: {
							defaultValue: 'key2',
						},
					},
				},
			};
		}

		if (path.includes('bar')) {
			return {
				label: {
					i18n: {
						key: 'ns1:KEY3',
						options: {
							defaultValue: 'key3',
						},
					},
				},
				message: {
					i18n: {
						key: 'ns1:KEY4',
						options: {
							defaultValue: 'key4',
						},
					},
				},
			};
		}
	},
}));

const {
	getI18Next,
	getLocaleByNamespace,
	getLocaleByNamespaceInFolder,
	getNameSpacesByLocale,
	getPathFromPattern,
	parseSettings,
	setTranslate,
	updateLocale,
} = require('./cmf-settings.i18n');

describe('i18n scripts', () => {
	describe('#getNameSpacesByLocale', () => {
		it('should get initiailized i18next with the locales', () => {
			expect(getNameSpacesByLocale({ ns1: 'src/{{namespace}}/{{locale}}' }, 'fr')).toEqual({
				ns1: { key1: 'bar', oldKey: 'bar' },
			});
		});
	});

	describe('#getI18Next', () => {
		it('should get initiailized i18next with the locales', () => {
			expect(getI18Next(['fr'], { ns1: 'src/{{namespace}}/{{locale}}' }).store.data).toEqual({
				fr: { ns1: { key1: 'bar', oldKey: 'bar' } },
			});
		});
	});

	describe('#getLocaleByNamespaceInFolder', () => {
		const oldReaddirSync = fs.readdirSync;
		const oldExistsSync = fs.existsSync;

		afterEach(() => {
			fs.readdirSync = oldReaddirSync;
			fs.existsSync = oldExistsSync;
		});

		it('should fetch a folder to get all locale by namespace', () => {
			const namespace = 'ns1';
			const readdirSync = jest.fn(() => ['foo', 'bar']);

			fs.readdirSync = readdirSync;
			fs.existsSync = () => true;

			const localizedJSON = getLocaleByNamespaceInFolder('root', namespace);

			expect(localizedJSON).toEqual(
				new Map([['KEY1', 'key1'], ['KEY2', 'key2'], ['KEY3', 'key3'], ['KEY4', 'key4']]),
			);
		});
	});

	describe('#updateLocale', () => {
		const oldWriteFileSync = fs.writeFileSync;
		const oldExistsSync = fs.existsSync;

		afterEach(() => {
			fs.writeFileSync = oldWriteFileSync;
			fs.existsSync = oldExistsSync;
		});

		it('should create the locale with the defaultValue when the locale is en', () => {
			const writeFileSync = jest.fn();
			fs.writeFileSync = writeFileSync;
			const locale = 'en';
			const filePath = './src/{{namespace}}/{{locale}}';
			const namespace = 'ns1';

			updateLocale(new Map([['key1', 'foo']]), locale, namespace, filePath);
			expect(writeFileSync).toHaveBeenCalledWith(
				getPathFromPattern(filePath, namespace, locale),
				JSON.stringify(
					{
						key1: 'foo',
					},
					null,
					'  ',
				),
			);
		});

		it('should create the locale with empty when the locale is fr', () => {
			const writeFileSync = jest.fn();
			fs.writeFileSync = writeFileSync;
			const locale = 'fr';
			const filePath = './src/{{namespace}}/{{locale}}';
			const namespace = 'ns1';

			updateLocale(new Map([['key1', 'foo']]), namespace, locale, filePath);
			expect(writeFileSync).toHaveBeenCalledWith(
				getPathFromPattern(filePath, locale, namespace),
				JSON.stringify(
					{
						key1: '',
					},
					null,
					'  ',
				),
			);
		});

		it('should update the locale with the new keys and remove old keys', () => {
			const writeFileSync = jest.fn();
			fs.writeFileSync = writeFileSync;
			fs.existsSync = () => true;
			const locale = 'fr';
			const filePath = './src/{{namespace}}/{{locale}}';
			const namespace = 'ns1';

			updateLocale(new Map([['key1', 'foo'], ['newKey', 'new']]), namespace, locale, filePath);

			expect(writeFileSync).toHaveBeenCalledWith(
				getPathFromPattern(filePath, locale, namespace),
				JSON.stringify(
					{
						key1: 'bar',
						newKey: '',
					},
					null,
					'  ',
				),
			);
		});
	});

	describe('#parseSettings', () => {
		it('should apply the locale on the json', () => {
			const locale = 'fr';
			const i18next = {
				t: (key, options) => options.defaultValue,
				changeLanguage: jest.fn(),
			};
			const json = {
				label: {
					i18n: {
						key: 'ns:KEY1',
						options: {
							defaultValue: 'foo',
						},
					},
				},
			};

			const localizedJSON = parseSettings(i18next, json, 'fr');

			expect(localizedJSON).toEqual({
				label: 'foo',
			});
			expect(localizedJSON).not.toBe(json);
			expect(i18next.changeLanguage).toHaveBeenCalledWith(locale);
		});
	});

	describe('#setTranslate', () => {
		it('should replace the object with the current locale', () => {
			const i18next = {
				t: (key, options) => options.defaultValue,
			};
			const json = {
				label: {
					i18n: {
						key: 'ns:KEY1',
						options: {
							defaultValue: 'foo',
						},
					},
				},
			};

			setTranslate(i18next, json, ['$', 'label', 'i18n']);

			expect(json).toEqual({
				label: 'foo',
			});
		});
	});

	describe('#getPathFromPattern', () => {
		it('should return the path with the replaced value in the current working directory', () => {
			const namespace = 'ns1';
			const locale = 'fr';
			const filePath = getPathFromPattern('./src/{{namespace}}/{{locale}}.json', namespace, locale);

			expect(filePath).toBe(path.join(process.cwd(), 'src', namespace, `${locale}.json`));
		});
	});

	describe('#getLocaleByNamespace', () => {
		it('should parse a JSON and return all key for the given namespace', () => {
			const namespace = 'ns';
			const json = {
				label: {
					i18n: {
						key: `${namespace}:KEY1`,
						options: {
							defaultValue: 'foo',
						},
					},
				},
				message: {
					i18n: {
						key: `${namespace}:KEY2`,
						options: {
							defaultValue: 'bar',
						},
					},
				},
			};
			const locale = getLocaleByNamespace(json, namespace);

			expect(locale).toEqual(new Map([['KEY1', 'foo'], ['KEY2', 'bar']]));
		});
	});
});
