import i18next from 'i18next';

import getDefaultT, { getI18nInstance } from './translate';

describe('translate with real i18next', () => {
	beforeAll(() => {
		i18next.addResourceBundle(
			'en',
			'translation',
			{
				hello: 'Hello {{name}}',
				item_one: '{{count}} item',
				item_other: '{{count}} items',
			},
			true,
			true,
		);
	});

	it('getI18nInstance should return the i18next instance', () => {
		expect(getI18nInstance()).toBe(i18next);
	});

	it('getDefaultT should translate with interpolation', () => {
		const t = getDefaultT();
		expect(t('hello', { name: 'Bob' })).toBe('Hello Bob');
	});

	it('getDefaultT should handle plurals', () => {
		const t = getDefaultT();
		expect(t('item', { count: 1 })).toBe('1 item');
		expect(t('item', { count: 3 })).toBe('3 items');
	});

	it('getDefaultT should fallback to defaultValue on missing key', () => {
		const t = getDefaultT();
		expect(t('missing.key', { defaultValue: 'Fallback {{x}}', x: 'ok' })).toBe('Fallback ok');
	});

	it('getDefaultT should handle defaultValue_other plural', () => {
		const t = getDefaultT();
		expect(
			t('unknown.plural', {
				count: 2,
				defaultValue: '{{count}} thing',
				defaultValue_other: '{{count}} things',
			}),
		).toBe('2 things');
	});

	it('getDefaultT should return the key when there is no defaultValue', () => {
		expect(getDefaultT()('another.missing')).toBe('another.missing');
	});
});
