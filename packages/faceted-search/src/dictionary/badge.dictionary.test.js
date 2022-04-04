import { filterBadgeDefinitionsWithDictionary } from './badge.dictionary';

describe('filterBadgeDefinitionsWithDictionary', () => {
	it('should return the list filtered', () => {
		// given
		const badgesDictionary = { text: '', checkbox: '' };
		const badges = [
			{ label: 'test', properties: { type: 'text' } },
			{ label: 'test2', properties: { type: 'checkbox' } },
			{ label: 'test3', properties: { type: 'tag' } },
		];
		// when
		const result = filterBadgeDefinitionsWithDictionary(badgesDictionary, badges);
		// then
		expect(result.length).toBe(2);
	});
});
