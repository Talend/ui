import React from 'react';
import { shallow } from 'enzyme';
import ColumnChooserContent from './ColumnChooserContent.component';
import { useColumnChooserManager } from '../hooks';

jest.mock('../hooks');
useColumnChooserManager.mockImplementation(() => {
	return {
		handlerChangeVisibility: jest.fn(),
		handlerBlurInputTextOrder: jest.fn(),
		handlerDragAndDrop: jest.fn(),
		handlerInputTextOrder: jest.fn(),
		handlerSelectAll: jest.fn(),
		submitColumnChooser: jest.fn(),
		stateColumnChooser: { editedColumns: [], selectAll: false },
	};
});

describe('ColumnChooserContent', () => {
	it('should render with default column chooser component', () => {
		// given
		const props = {
			id: 'myId',
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
					locked: false,
					hidden: false,
				},
			],
			handlerColumnChooser: jest.fn(),
			t: jest.fn(),
		};
		// when
		const wrapper = shallow(<ColumnChooserContent {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render with custom column chooser component', () => {
		// given
		const props = {
			id: 'myId',
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
					locked: false,
					hidden: false,
				},
			],
			handlerColumnChooser: jest.fn(),
			t: jest.fn(),
			header: <div>my header</div>,
			body: <div>my body</div>,
			footer: <div>my footer</div>,
		};
		// when
		const wrapper = shallow(<ColumnChooserContent {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
