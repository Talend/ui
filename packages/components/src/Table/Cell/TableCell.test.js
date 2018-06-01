import React from 'react';
import renderer from 'react-test-renderer';
import TableCell from './TableCell';
import * as TestData from '../TestData';

/**
 * Render a single cell
 */
it('single-cell', () => {
	const element = TestData.element1;
	// create React tree
	const tree = renderer
		.create(<TableCell element={element} data={element.name} className="my-single-cell" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

/**
 * Render a clickable cell
 */
it('clickable-cell', () => {
	const element = TestData.element1;
	const extra = {
		onClick: jest.fn(),
		onDoubleClick: jest.fn(),
		onKeyPress: jest.fn(),
	};
	// create React tree
	const tree = renderer
		.create(
			<TableCell
				element={element}
				data={element.name}
				className="my-clickable-cell"
				extra={extra}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
