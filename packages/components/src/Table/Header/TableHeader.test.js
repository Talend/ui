import React from 'react';
import renderer from 'react-test-renderer';
import TableHeader from './TableHeader';
import * as TestData from '../TestData';

/**
 * Render three column headers with simple label
 */
it('three-columns', () => {
	const tree = renderer.create(<TableHeader columns={TestData.columns1} />).toJSON();
	expect(tree).toMatchSnapshot();
});

/**
 * Render three column headers with sorters
 */
it('three-columns-with-sorters', () => {
	const onSortChange = jest.fn();
	const columns = [
		TestData.addSortExtraProps(TestData.Columns.NAME),
		TestData.addSortExtraProps(TestData.Columns.TYPE),
		TestData.addSortExtraProps(TestData.Columns.DESC),
	];
	const sorter = TestData.getSorter();
	const sorters = {
		name: sorter,
		type: sorter,
		desc: sorter,
	};
	// create React tree
	const tree = renderer
		.create(<TableHeader columns={columns} sorters={sorters} onSortChange={onSortChange} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
