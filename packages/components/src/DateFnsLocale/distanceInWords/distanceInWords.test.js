import getDefaultT from '../../translate';
import buildDistanceInWordsLocale from './distanceInWords';

describe('distanceInWords', () => {
	it('should return the formatDistance with ', () => {
		const distanceInWords = buildDistanceInWordsLocale(getDefaultT());
		expect(
			distanceInWords.localize('lessThanXSeconds', 5, {
				addSuffix: true,
			}),
		).toBe('less than 5 seconds ago');
		expect(
			distanceInWords.localize('lessThanXSeconds', 1, {
				addSuffix: true,
			}),
		).toBe('less than a second ago');
		expect(
			distanceInWords.localize('xSeconds', 5, {
				addSuffix: true,
			}),
		).toBe('5 seconds ago');
		expect(
			distanceInWords.localize('xSeconds', 1, {
				addSuffix: true,
			}),
		).toBe('1 second ago');
		expect(
			distanceInWords.localize('halfAMinute', null, {
				addSuffix: true,
			}),
		).toBe('half a minute ago');
		expect(
			distanceInWords.localize('lessThanXMinutes', 5, {
				addSuffix: true,
			}),
		).toBe('less than 5 minutes ago');
		expect(
			distanceInWords.localize('lessThanXMinutes', 1, {
				addSuffix: true,
			}),
		).toBe('less than a minute ago');
		expect(
			distanceInWords.localize('xMinutes', 5, {
				addSuffix: true,
			}),
		).toBe('5 minutes ago');
		expect(
			distanceInWords.localize('xMinutes', 1, {
				addSuffix: true,
			}),
		).toBe('1 minute ago');
		expect(
			distanceInWords.localize('aboutXHours', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 hours ago');
		expect(
			distanceInWords.localize('aboutXHours', 1, {
				addSuffix: true,
			}),
		).toBe('about 1 hour ago');
		expect(
			distanceInWords.localize('xHours', 5, {
				addSuffix: true,
			}),
		).toBe('5 hours ago');
		expect(
			distanceInWords.localize('xHours', 1, {
				addSuffix: true,
			}),
		).toBe('1 hour ago');
		expect(
			distanceInWords.localize('xDays', 5, {
				addSuffix: true,
			}),
		).toBe('5 days ago');
		expect(
			distanceInWords.localize('xDays', 1, {
				addSuffix: true,
			}),
		).toBe('1 day ago');
		expect(
			distanceInWords.localize('aboutXMonths', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 months ago');
		expect(
			distanceInWords.localize('aboutXMonths', 1, {
				addSuffix: true,
			}),
		).toBe('about 1 month ago');
		expect(
			distanceInWords.localize('xMonths', 5, {
				addSuffix: true,
			}),
		).toBe('5 months ago');
		expect(
			distanceInWords.localize('xMonths', 1, {
				addSuffix: true,
			}),
		).toBe('1 month ago');
		expect(
			distanceInWords.localize('aboutXYears', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 years ago');
		expect(
			distanceInWords.localize('aboutXYears', 1, {
				addSuffix: true,
			}),
		).toBe('about 1 year ago');
		expect(
			distanceInWords.localize('xYears', 5, {
				addSuffix: true,
			}),
		).toBe('5 years ago');
		expect(
			distanceInWords.localize('xYears', 1, {
				addSuffix: true,
			}),
		).toBe('1 year ago');
		expect(
			distanceInWords.localize('overXYears', 5, {
				addSuffix: true,
			}),
		).toBe('over 5 years ago');
		expect(
			distanceInWords.localize('overXYears', 1, {
				addSuffix: true,
			}),
		).toBe('over 1 year ago');
		expect(
			distanceInWords.localize('almostXYears', 5, {
				addSuffix: true,
			}),
		).toBe('almost 5 years ago');
		expect(
			distanceInWords.localize('almostXYears', 1, {
				addSuffix: true,
			}),
		).toBe('almost 1 year ago');
		expect(
			distanceInWords.localize('lessThanXSeconds', 5, {
				addSuffix: true,
				comparison: 1,
			}),
		).toBe('in less than 5 seconds');
		expect(
			distanceInWords.localize('lessThanXSeconds', 1, {
				addSuffix: true,
				comparison: 1,
			}),
		).toBe('in less than a second');
		expect(distanceInWords.localize('lessThanXSeconds', 5)).toBe('less than 5 seconds');
		expect(distanceInWords.localize('lessThanXSeconds', 1)).toBe('less than a second');
	});
});
