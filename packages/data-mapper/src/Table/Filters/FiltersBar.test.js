import React from 'react';
import renderer from 'react-test-renderer';
import FiltersBar from './FiltersBar';
import * as TestData from '../TestData';

/**
 * Render two filters
 */
it('two-filters', () => {
	const match = jest.fn().mockReturnValue(true);
	const filters = [
		TestData.getNameFilter(TestData.nameFilterId, match),
		TestData.getMandatoryFieldFilter(TestData.mandatoryFieldFilterId, match),
	];
	// create React tree
	const tree = renderer
		.create(<FiltersBar filters={filters} onFilterChange={jest.fn()} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
