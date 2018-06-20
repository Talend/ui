import React from 'react';
import renderer from 'react-test-renderer';
import FiltersBar from './FiltersBar';
import * as TestData from '../TestData';

/**
 * Render two filters
 */
it('two-filters', () => {
	const filters = [TestData.nameFilter, TestData.mandatoryFieldFilter];
	// create React tree
	const tree = renderer
		.create(
			<FiltersBar classnames={TestData.classnames} filters={filters} onFilterChange={jest.fn()} />,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
