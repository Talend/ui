import React from 'react';
import renderer from 'react-test-renderer';
import MappingItem from './MappingItem.js';

const item = ['element_in', 'element_out'];

it('single-item', () => {
	// create React tree
	const tree = renderer.create(<MappingItem mappingItem={item} />).toJSON();
	expect(tree).toMatchSnapshot();
});
