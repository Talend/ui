import React from 'react';
import renderer from 'react-test-renderer';
import TitleBar from './TitleBar';
import * as TestData from '../TestData';

/**
 * Render title bar with a title and filters
 */
it('title-bar', () => {
	const title = 'TALEND.SCHEMA';
	const match = jest.fn().mockReturnValue(true);
	const filters = [
		TestData.getNameFilter(TestData.nameFilterId, match),
		TestData.getMandatoryFieldFilter(TestData.mandatoryFieldFilterId, match),
	];
	// create React tree
	const tree = renderer
		.create(<TitleBar title={title} filters={filters} onFilterChange={jest.fn()} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
