import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { HeaderResizable } from './HeaderResizable.component';
import { virtualizedListContext } from '../virtualizedListContext';

describe('HeaderResizable', () => {
	it('should throw an error if used outside the virtualized list provider', () => {
		// when
		try {
			mount(<HeaderResizable />);
			expect.fail(
				'It should have thrown an error because useListContext is used outside of context provider',
			);
		} catch (error) {
			// then
			expect(error.message).toBe(
				'@talend/react-components > VirtualizedList: you are using a sub component out of VirtualizedList.',
			);
		}
	});
	it('should render with no specific props', () => {
		const resizeColumn = jest.fn();
		// when
		const wrapper = mount(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable />
			</virtualizedListContext.Provider>,
		);
		// then
		expect(toJson(wrapper)).toMatchSnapshot();
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with label', () => {
		// given
		const resizeColumn = jest.fn();
		const label = 'my header label';
		// when
		const wrapper = mount(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable label={label} />
			</virtualizedListContext.Provider>,
		);
		// then
		expect(wrapper.find('HeaderResizableContent').prop('label')).toBe(label);
	});
	it('should render with custom header resizable', () => {
		// given
		const resizeColumn = jest.fn();
		const label = 'my header label';
		// when
		const wrapper = mount(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable>
					<button id="myCustomButton">{label}</button>
					<span>This is a custom resizable header</span>
				</HeaderResizable>
			</virtualizedListContext.Provider>,
		);
		// then
		expect(wrapper.find('button#myCustomButton').text()).toBe(label);
	});
	it('should change resizing state when dragging is trigger', () => {
		// given
		const resizeColumn = jest.fn();
		const label = 'my header label';
		// when
		const wrapper = mount(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable label={label} />
			</virtualizedListContext.Provider>,
		);
		expect(wrapper.state('resizing')).toBe(false);
		wrapper.find('Draggable').simulate('mousedown');
		// then
		expect(
			wrapper.find(
				'div[className="tc-header-cell-resizable theme-tc-header-cell-resizable tc-header-cell-resizable-resizing theme-tc-header-cell-resizable-resizing"]',
			),
		).toHaveLength(1);
		expect(wrapper.state('resizing')).toBe(true);
	});
	it('should change resizing state when dragging is ended', () => {
		// given
		const label = 'my header label';
		const resizeColumn = jest.fn();
		// when
		const wrapper = mount(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable label={label} />
			</virtualizedListContext.Provider>,
		);
		wrapper.find('Draggable').simulate('mousedown');
		expect(wrapper.state('resizing')).toBe(true);
		// then
		wrapper.find('Draggable').simulate('mouseup');
		expect(wrapper.state('resizing')).toBe(false);
	});
	it('should change the width by 10 when right keyboard is trigger', () => {
		// given
		const label = 'my header label';
		const resizeColumn = jest.fn();
		const dataKey = 'myDataKey';
		const wrapper = mount(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable dataKey={dataKey} label={label} />
			</virtualizedListContext.Provider>,
		);
		// when
		wrapper
			.find('input[data-testId="resize-input-button-ally"]')
			.simulate('keyDown', { keyCode: 39 });
		// then
		expect(resizeColumn).toHaveBeenNthCalledWith(1, dataKey, 10);
	});
	it('should change the width by 10 when enter keyboard is trigger', () => {
		// given
		const label = 'my header label';
		const resizeColumn = jest.fn();
		const dataKey = 'myDataKey';
		const wrapper = mount(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable dataKey={dataKey} label={label} />
			</virtualizedListContext.Provider>,
		);
		// when
		wrapper
			.find('input[data-testId="resize-input-button-ally"]')
			.simulate('keyDown', { keyCode: 'something' });
		// then
		expect(resizeColumn).toHaveBeenNthCalledWith(1, dataKey, 0);
	});
	it('should change the width by -10 when left keyboard is trigger', () => {
		// given
		const label = 'my header label';
		const resizeColumn = jest.fn();
		const dataKey = 'myDataKey';
		const wrapper = mount(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable dataKey={dataKey} label={label} />
			</virtualizedListContext.Provider>,
		);
		// when
		wrapper
			.find('input[data-testId="resize-input-button-ally"]')
			.simulate('keyDown', { keyCode: 37 });
		// then
		expect(resizeColumn).toHaveBeenNthCalledWith(1, dataKey, -10);
	});
});
