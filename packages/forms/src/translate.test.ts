import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import getDefaultT from './translate';

describe('getDefaultT', () => {
	it('should return a t function bound to the i18n instance', () => {
		i18n.addResourceBundle('en', 'translation', { greet: 'Hi {{name}}' }, true, true);
		const t = getDefaultT();
		expect(t('greet', { name: 'Bob' })).toBe('Hi Bob');
	});

	it('should use defaultValue when key is missing', () => {
		const t = getDefaultT();
		expect(t('nope', { defaultValue: 'Default' })).toBe('Default');
	});

	it('should handle plurals', () => {
		i18n.addResourceBundle(
			'en',
			'translation',
			{ n_one: '{{count}} row', n_other: '{{count}} rows' },
			true,
			true,
		);
		const t = getDefaultT();
		expect(t('n', { count: 1 })).toBe('1 row');
		expect(t('n', { count: 5 })).toBe('5 rows');
	});
});
