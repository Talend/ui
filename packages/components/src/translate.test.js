import i18next from 'i18next';
import { getCurrentLanguage } from './translate';

const originalLang = i18next.language;
describe('getCurrentLanguage', () => {
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
