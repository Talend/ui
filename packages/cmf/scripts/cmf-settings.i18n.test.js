const path = require('path');
const process = require('process');

jest.mock('');

const { getLocaleByNamespace, getPathFromPattern } = require('./cmf-settings.i18n');

describe('i18n scripts', () => {
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
