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
				message: {
					i18n: {
						key: 'ns1:KEY2',
						options: {
							defaultValue: 'key2',
						},
					},
				},
				label: {
					i18n: {
						key: 'ns1:KEY1',
						options: {
							defaultValue: 'key1',
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
	getLocalesFromNamespace,
	getLocalesFromNamespaceInFolder,
	getNameSpacesByLocale,
	getPathFromPattern,
	parseI18n,
	parseSettings,
	setTranslate,
	updateLocale,
} = require('./cmf-settings.i18n');

describe('i18n scripts', () => {
	describe('#getNameSpacesByLocale', () => {
		it('should get initialized i18next with the locales', () => {
			expect(
				getNameSpacesByLocale([{ name: 'ns1', path: 'src/{{namespace}}/{{locale}}' }], 'fr'),
			).toEqual({
				ns1: { key1: 'bar', oldKey: 'bar' },
			});
		});
	});

	describe('#getLocalesFromNamespaceInFolder', () => {
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

			const localizedJSON = getLocalesFromNamespaceInFolder('root', namespace);

			expect(localizedJSON).toEqual(
				new Map([
					['KEY2', 'key2'],
					['KEY1', 'key1'],
					['KEY3', 'key3'],
					['KEY4', 'key4'],
				]),
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

			updateLocale(
				new Map([
					['key2', 'test'],
					['key1', 'foo'],
				]),
				locale,
				namespace,
				filePath,
			);
			expect(writeFileSync).toHaveBeenCalledWith(
				getPathFromPattern(filePath, namespace, locale),
				JSON.stringify(
					{
						key2: 'test',
						key1: 'foo',
					},
					null,
					'  ',
				) + String.fromCharCode(10),
			);
		});

		it('should create the locale with the sorted keys', () => {
			const writeFileSync = jest.fn();
			fs.writeFileSync = writeFileSync;
			const locale = 'en';
			const filePath = './src/{{namespace}}/{{locale}}';
			const namespace = 'ns1';

			updateLocale(
				new Map([
					['key2', 'test'],
					['key1', 'foo'],
				]),
				locale,
				namespace,
				filePath,
				true,
			);
			expect(writeFileSync).toHaveBeenCalledWith(
				getPathFromPattern(filePath, namespace, locale),
				JSON.stringify(
					{
						key1: 'foo',
						key2: 'test',
					},
					null,
					'  ',
				) + String.fromCharCode(10),
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
				) + String.fromCharCode(10),
			);
		});

		it('should update the locale with the new keys and remove old keys', () => {
			const writeFileSync = jest.fn();
			fs.writeFileSync = writeFileSync;
			fs.existsSync = () => true;
			const locale = 'fr';
			const filePath = './src/{{namespace}}/{{locale}}';
			const namespace = 'ns1';

			updateLocale(
				new Map([
					['key1', 'foo'],
					['newKey', 'new'],
				]),
				namespace,
				locale,
				filePath,
			);

			expect(writeFileSync).toHaveBeenCalledWith(
				getPathFromPattern(filePath, locale, namespace),
				JSON.stringify(
					{
						key1: 'bar',
						newKey: '',
					},
					null,
					'  ',
				) + String.fromCharCode(10),
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

	describe('#getLocalesFromNamespace', () => {
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
				foo: {
					i18n: {
						key: 'foo:KEY2',
						options: {
							defaultValue: 'bar',
						},
					},
				},
			};
			const locale = getLocalesFromNamespace(json, namespace);

			expect(locale).toEqual(
				new Map([
					['KEY1', 'foo'],
					['KEY2', 'bar'],
				]),
			);
		});

		it('should parse a JSON with a key without namespace', () => {
			const namespace = 'ns';
			const invalidNamespace = 'invalid';
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
				foo: {
					i18n: {
						key: 'KEY3',
						options: {
							defaultValue: 'bar',
						},
					},
				},
				invalid: {
					i18n: {
						key: `${invalidNamespace}:KEY4`,
						options: {
							defaultValue: 'bar',
						},
					},
				},
			};

			expect(() => getLocalesFromNamespace(json, namespace, true)).toThrow();
		});
	});

	describe('#parseI18n', () => {
		const oldReaddirSync = fs.readdirSync;
		const oldExistsSync = fs.existsSync;
		const oldWriteFileSync = fs.writeFileSync;

		afterEach(() => {
			fs.readdirSync = oldReaddirSync;
			fs.existsSync = oldExistsSync;
			fs.writeFileSync = oldWriteFileSync;
		});

		it('should parse a folder and extract the keys', () => {
			const readdirSync = jest.fn(() => ['foo', 'bar']);
			const writeFileSync = jest.fn();
			fs.writeFileSync = writeFileSync;
			fs.readdirSync = readdirSync;
			fs.existsSync = () => true;

			parseI18n([{ name: 'ns1', path: '{{namespace}}/{{locale}}.json' }], ['en'], 'root');

			expect(writeFileSync).toHaveBeenCalledWith(
				getPathFromPattern('{{namespace}}/{{locale}}.json', 'ns1', 'en'),
				JSON.stringify(
					{
						KEY2: 'key2',
						KEY1: 'key1',
						KEY3: 'key3',
						KEY4: 'key4',
					},
					null,
					'  ',
				) + String.fromCharCode(10),
			);
		});

		it('should parse many folders and extract the keys', () => {
			const readdirSync = jest.fn(() => ['foo', 'bar']);
			const writeFileSync = jest.fn();
			fs.writeFileSync = writeFileSync;
			fs.readdirSync = readdirSync;
			fs.existsSync = () => true;

			parseI18n(
				[{ name: 'ns1', path: '{{namespace}}/{{locale}}.json' }],
				['en'],
				['root', 'root2'],
			);

			expect(writeFileSync).toHaveBeenCalledWith(
				getPathFromPattern('{{namespace}}/{{locale}}.json', 'ns1', 'en'),
				JSON.stringify(
					{
						KEY2: 'key2',
						KEY1: 'key1',
						KEY3: 'key3',
						KEY4: 'key4',
					},
					null,
					'  ',
				) + String.fromCharCode(10),
			);
		});

		it('should parse a folder and extract the sorted keys', () => {
			const readdirSync = jest.fn(() => ['foo', 'bar']);
			const writeFileSync = jest.fn();
			fs.writeFileSync = writeFileSync;
			fs.readdirSync = readdirSync;
			fs.existsSync = () => true;

			parseI18n([{ name: 'ns1', path: '{{namespace}}/{{locale}}.json' }], ['en'], 'root', true);

			expect(writeFileSync).toHaveBeenCalledWith(
				getPathFromPattern('{{namespace}}/{{locale}}.json', 'ns1', 'en'),
				JSON.stringify(
					{
						KEY1: 'key1',
						KEY2: 'key2',
						KEY3: 'key3',
						KEY4: 'key4',
					},
					null,
					'  ',
				) + String.fromCharCode(10),
			);
		});
	});
});
