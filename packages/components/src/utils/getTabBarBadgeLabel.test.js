import getTabBarBadgeLabel from './getTabBarBadgeLabel';

describe('getTabBarBadgeLabel tests', () => {
	it('should return label as it is, if it is not a number', () => {
		const label = '87b';
		const result = getTabBarBadgeLabel(label);
		expect(result).toEqual(label);
	});

	it('should return label as it is, if it is number (or can be dynamically converted to a number) and less than 1000', () => {
		const label1 = 857;
		const label2 = '857';

		expect(getTabBarBadgeLabel(label1)).toEqual(label1);
		expect(getTabBarBadgeLabel(label2)).toEqual(label2);
	});

	it('should return 999+ if label is a number (or can be dynamically converted to a number) and is greater than 1000', () => {
		const label = 1567;
		expect(getTabBarBadgeLabel(label)).toEqual('999+');
	});
});
