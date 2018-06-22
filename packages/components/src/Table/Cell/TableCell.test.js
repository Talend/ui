import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TableCell from './TableCell';
import * as TestData from '../TestData';

/**
 * Render a single cell
 */
it('render-single-cell', () => {
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
it('render-clickable-cell', () => {
	const element = TestData.element1;
	// create React tree
	const tree = renderer
		.create(
			<TableCell
				element={element}
				data={element.name}
				className="my-clickable-cell"
				onClick={jest.fn()}
				onDoubleClick={jest.fn()}
				onKeyPress={jest.fn()}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('test-callback-on-clickable-cell', () => {
	const element = TestData.element1;
	const onClick = jest.fn();
	const onDoubleClick = jest.fn();
	const onKeyPress = jest.fn();
	// create wrapper
	const wrapper = shallow(
		<TableCell
			element={element}
			data={element.name}
			className="my-clickable-cell"
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			onKeyPress={onKeyPress}
		/>,
	);
	const clickableCell = wrapper.find('.my-clickable-cell');
	clickableCell.simulate('click');
	expect(onClick).toBeCalled();
	clickableCell.simulate('doubleClick');
	expect(onDoubleClick).toBeCalled();
	clickableCell.simulate('keyPress');
	expect(onKeyPress).toBeCalled();
});
