import i18next from 'i18next';

import { getCurrentLanguage } from './translate';

describe('getCurrentLanguage', () => {
	let originalLang;
	beforeEach(() => {
		originalLang = i18next.language;
	});
	afterEach(() => {
		i18next.language = originalLang;
	});
	it('should return the locale', () => {
		expect(getCurrentLanguage()).toBe('en');

		i18next.language = 'fr';

		expect(getCurrentLanguage()).toBe('fr');
	});
});
