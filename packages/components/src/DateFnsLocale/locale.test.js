import i18next from 'i18next';
import getDefaultT from '../translate';
import getLocale, { buildDistanceInWordsLocale } from './locale';

describe('buildDistanceInWordsLocale', () => {
	it('should return the formatDistance with ', () => {
		const distanceInWords = buildDistanceInWordsLocale(getDefaultT());
		expect(
			distanceInWords.localize('lessThanXSeconds', 5, {
				addSuffix: true,
			}),
		).toBe('less than 5 seconds ago');
		expect(
			distanceInWords.localize('xSeconds', 5, {
				addSuffix: true,
			}),
		).toBe('5 seconds ago');
		expect(
			distanceInWords.localize('halfAMinute', 5, {
				addSuffix: true,
			}),
		).toBe('half a minute ago');
		expect(
			distanceInWords.localize('lessThanXMinutes', 5, {
				addSuffix: true,
			}),
		).toBe('less than 5 minutes ago');
		expect(
			distanceInWords.localize('xMinutes', 5, {
				addSuffix: true,
			}),
		).toBe('5 minutes ago');
		expect(
			distanceInWords.localize('aboutXHours', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 hours ago');
		expect(
			distanceInWords.localize('xHours', 5, {
				addSuffix: true,
			}),
		).toBe('5 hours ago');
		expect(
			distanceInWords.localize('xDays', 5, {
				addSuffix: true,
			}),
		).toBe('5 days ago');
		expect(
			distanceInWords.localize('aboutXMonths', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 months ago');
		expect(
			distanceInWords.localize('xMonths', 5, {
				addSuffix: true,
			}),
		).toBe('5 months ago');
		expect(
			distanceInWords.localize('aboutXYears', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 years ago');
		expect(
			distanceInWords.localize('xYears', 5, {
				addSuffix: true,
			}),
		).toBe('5 years ago');
		expect(
			distanceInWords.localize('overXYears', 5, {
				addSuffix: true,
			}),
		).toBe('over 5 years ago');
		expect(
			distanceInWords.localize('almostXYears', 5, {
				addSuffix: true,
			}),
		).toBe('almost 5 years ago');
		expect(
			distanceInWords.localize('lessThanXSeconds', 5, {
				addSuffix: true,
				comparison: 1,
			}),
		).toBe('in less than 5 seconds');

		expect(distanceInWords.localize('lessThanXSeconds', 5)).toBe('less than 5 seconds');
	});
});

describe('getLocale', () => {
	let originalLang;
	beforeEach(() => {
		originalLang = i18next.language;
	});
	afterEach(() => {
		i18next.language = originalLang;
	});
	it('should return the locale', () => {
		const locale = getLocale(getDefaultT());

		expect(locale.distanceInWords).toBeDefined();
		expect(locale.distanceInWords.localize).toBeDefined();
		expect(locale.distanceInWords.localize('lessThanXSeconds', 2)).toBe('less than 2 seconds');
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
