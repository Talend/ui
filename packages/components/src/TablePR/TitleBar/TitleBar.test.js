import React from 'react';
import renderer from 'react-test-renderer';
import TitleBar from './TitleBar';
import * as TestData from '../TestData';

/**
 * Render title bar with a title and filters
 */
it('title-bar', () => {
	const title = 'TALEND.SCHEMA';
	const filters = [TestData.nameFilter, TestData.mandatoryFieldFilter];
	// create React tree
	const tree = renderer
		.create(
			<TitleBar
				title={title}
				classnames={TestData.classnames}
				filters={filters}
				onFilterChange={jest.fn()}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
