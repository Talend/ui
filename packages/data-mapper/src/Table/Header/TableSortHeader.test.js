import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TableSortHeader from './TableSortHeader';
import * as TestData from '../TestData';

/**
 * Render a sort header
 */
it('render-sort-header', () => {
	// create React tree
	const tree = renderer
		.create(
			<TableSortHeader
				column={TestData.addSortExtraProps(TestData.Columns.NAME)}
				sorter={TestData.getSorter()}
				onSortChange={jest.fn()}
				className="sort-header"
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('test-callback-on-sort-header', () => {
	const onSortChange = jest.fn();
	// create wrapper
	const wrapper = shallow(
		<TableSortHeader
			column={TestData.addSortExtraProps(TestData.Columns.NAME)}
			sorter={TestData.getSorter()}
			onSortChange={onSortChange}
			className="sort-header"
		/>,
	);
	const sortHeader = wrapper.find('.sort-header');
	sortHeader.simulate('click');
	expect(onSortChange).toBeCalled();
	expect(onSortChange.mock.calls[0][0]).toBe(TestData.Columns.NAME.key);
});
