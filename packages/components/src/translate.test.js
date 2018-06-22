import i18next from 'i18next';
import { getCurrentLanguage } from './translate';

describe('getCurrentLanguage', () => {
	afterEach(() => {
		i18next.language = undefined;
	});
	it('should return the locale', () => {
		expect(i18next.language).toBe(undefined);
		expect(getCurrentLanguage()).toBe('en');

		i18next.language = 'fr';

		expect(getCurrentLanguage()).toBe('fr');
	});
});
