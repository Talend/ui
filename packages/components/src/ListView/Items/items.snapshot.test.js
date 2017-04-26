import React from 'react';
import renderer from 'react-test-renderer';
import Items from './Items.component';

jest.mock('../../../node_modules/react-virtualized/dist/commonjs/AutoSizer/AutoSizer', () => props =>
	<div id="autoSizer">{ props.children({ height: 30, width: 30 }) }</div> // eslint-disable-line react/prop-types
);

describe('Items', () => {
	it('should display a checked item betweew the two other', () => {
		// given
		const props = {
			items: Array(3).fill('').map((item, index) => ({
				label: `Lorem ipsum dolor sit amet ${index}`,
			})),
		};

		props.items[1].checked = true;

		// when
		const wrapper = renderer.create(
			<Items {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
