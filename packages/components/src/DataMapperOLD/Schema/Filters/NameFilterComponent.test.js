import React from 'react';
import renderer from 'react-test-renderer';
import NameFilterComponent from './NameFilterComponent';
import NameFilter from './NameFilter';

it('name-filter-component', () => {
	const filter = new NameFilter(false);
	// create React tree
	const tree = renderer.create(<NameFilterComponent filter={filter} />).toJSON();
	expect(tree).toMatchSnapshot();
});
