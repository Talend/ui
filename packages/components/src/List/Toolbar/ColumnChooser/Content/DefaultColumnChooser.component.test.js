import React from 'react';
import { shallow } from 'enzyme';
import {
	DefaultBody,
	DefaultFooter,
	DefaultHeader,
	getColumnDisplay,
} from './DefaultColumnChooser.components';

const t = jest.fn((_, translationValue) => translationValue.defaultValue);

describe('DefaultHeader', () => {
	it('should render', () => {
		// given
		const props = {
			t,
		};
		// when
		const wrapper = shallow(<DefaultHeader {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('DefaultBody', () => {
	it('should render', () => {
		// given
		const props = {
			columns: [
				{
					label: 'col1',
					order: 1,
					locked: false,
					hidden: false,
				},
				{
					label: 'col2',
					order: 1,
					locked: true,
					hidden: false,
				},
			],
			onBlurOrder: () => jest.fn(),
			onChangeVisibility: () => jest.fn(),
			onDragAndDrop: () => jest.fn(),
			onKeyPressOrder: () => jest.fn(),
			t,
		};
		// when
		const wrapper = shallow(<DefaultBody {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('DefaultFooter', () => {
	it('should render', () => {
		// given
		const props = {
			selectAllValue: false,
			onSelectAll: jest.fn(),
			submit: jest.fn(),
			t,
		};
		// when
		const wrapper = shallow(<DefaultFooter {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('getColumnDisplay', () => {
	const length = 10;
	const onChangeVisibility = () => jest.fn();
	const onDragAndDrop = () => jest.fn();
	const onBlurOrder = () => jest.fn();
	const onKeyPressOrder = () => jest.fn();
	it('should return a draggrable column displayer', () => {
		// given
		const column = {
			label: 'col1',
			order: 1,
			locked: false,
			hidden: false,
		};
		const index = 0;
		// when
		const ret = getColumnDisplay(
			length,
			onChangeVisibility,
			onDragAndDrop,
			onBlurOrder,
			onKeyPressOrder,
			t,
		)(column, index);
		// then
		expect(ret).toMatchSnapshot();
	});
	it('should return a simple column displayer', () => {
		// given
		const column = {
			label: 'col2',
			order: 1,
			locked: true,
			hidden: false,
		};
		const index = 1;
		// when
		const ret = getColumnDisplay(
			length,
			onChangeVisibility,
			onDragAndDrop,
			onBlurOrder,
			onKeyPressOrder,
			t,
		)(column, index);
		// then
		expect(ret).toMatchSnapshot();
	});
});
