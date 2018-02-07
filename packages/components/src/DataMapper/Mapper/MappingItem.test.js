import React from 'react';
import MappingItem from './MappingItem.js';
import renderer from 'react-test-renderer';

const item = ['element_in', 'element_out'];

it('single-item', () => {
	// create React tree
	const tree = renderer.create(<MappingItem mappingItem={item} />).toJSON();
	expect(tree).toMatchSnapshot();
});
