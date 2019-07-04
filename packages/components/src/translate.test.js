import i18next from 'i18next';

import { getCurrentLanguage } from './translate';

// use a variable to avoid that i18next-parser parse this key

describe('getCurrentLanguage', () => {
	let originalLang;
	beforeEach(() => {
		originalLang = i18next.language;
	});
	afterEach(() => {
		i18next.language = originalLang;
	});
	it('should return the locale', () => {
		expect(i18next.language).toBe('en');
		expect(getCurrentLanguage()).toBe('en');

		i18next.language = 'fr';

		expect(getCurrentLanguage()).toBe('fr');
	});
});
