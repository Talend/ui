import i18next from 'i18next';

import getLocale from './locale';

describe('getLocale', () => {
	let originalLang;
	beforeEach(() => {
		originalLang = i18next.language;
	});
	afterEach(() => {
		i18next.language = originalLang;
	});

	it('should return the formatDistance with ', () => {
		const locale = getLocale();
		expect(locale.formatDistance).toBeDefined();

		expect(
			locale.formatDistance('lessThanXSeconds', 5, {
				addSuffix: true,
			}),
		).toBe('less than 5 seconds ago');
		expect(
			locale.formatDistance('xSeconds', 5, {
				addSuffix: true,
			}),
		).toBe('5 seconds ago');
		expect(
			locale.formatDistance('halfAMinute', 5, {
				addSuffix: true,
			}),
		).toBe('half a minute ago');
		expect(
			locale.formatDistance('lessThanXMinutes', 5, {
				addSuffix: true,
			}),
		).toBe('less than 5 minutes ago');
		expect(
			locale.formatDistance('xMinutes', 5, {
				addSuffix: true,
			}),
		).toBe('5 minutes ago');
		expect(
			locale.formatDistance('aboutXHours', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 hours ago');
		expect(
			locale.formatDistance('xHours', 5, {
				addSuffix: true,
			}),
		).toBe('5 hours ago');
		expect(
			locale.formatDistance('xDays', 5, {
				addSuffix: true,
			}),
		).toBe('5 days ago');
		expect(
			locale.formatDistance('aboutXMonths', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 months ago');
		expect(
			locale.formatDistance('xMonths', 5, {
				addSuffix: true,
			}),
		).toBe('5 months ago');
		expect(
			locale.formatDistance('aboutXYears', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 years ago');
		expect(
			locale.formatDistance('xYears', 5, {
				addSuffix: true,
			}),
		).toBe('5 years ago');
		expect(
			locale.formatDistance('overXYears', 5, {
				addSuffix: true,
			}),
		).toBe('over 5 years ago');
		expect(
			locale.formatDistance('almostXYears', 5, {
				addSuffix: true,
			}),
		).toBe('almost 5 years ago');
		expect(
			locale.formatDistance('lessThanXSeconds', 5, {
				addSuffix: true,
				comparison: 1,
			}),
		).toBe('in less than 5 seconds');

		expect(locale.formatDistance('lessThanXSeconds', 5)).toBe('less than 5 seconds');
	});

	it('should return a locale different when we change the i18next language', () => {
		const locale = getLocale();
		const secondLocale = getLocale();
		expect(locale).toBe(secondLocale);
		i18next.language = 'fr';
		const thirdLocale = getLocale();
		expect(thirdLocale).not.toBe(secondLocale);
	});
});
