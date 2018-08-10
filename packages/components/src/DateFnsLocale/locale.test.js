import i18next from 'i18next';
import getDefaultT from '../translate';
import getLocale from './locale';

describe('getLocale', () => {
	afterEach(() => {
		i18next.language = undefined;
	});

	it('should return the locale', () => {
		const locale = getLocale(getDefaultT());
		expect(locale.distanceInWords).toBeDefined();
	});

	it('should return a locale different when we change the i18next language', () => {
		const locale = getLocale(getDefaultT());
		const secondLocale = getLocale(getDefaultT());
		expect(locale).toBe(secondLocale);
		i18next.language = 'fr';
		const thirdLocale = getLocale(getDefaultT());
		expect(thirdLocale).not.toBe(secondLocale);
	});
});
