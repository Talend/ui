import React from 'react';
import { shallow } from 'enzyme';
import ColumnChooserContent from './ColumnChooserContent.component';
import { useColumnChooserManager } from '../hooks';

jest.mock('../hooks');
useColumnChooserManager.mockImplementation(() => ({
	onChangeVisibility: jest.fn(),
	onBlurInputTextOrder: jest.fn(),
	onKeyPressInputTextOrder: jest.fn(),
	onSelectAll: jest.fn(),
	onSubmitColumnChooser: jest.fn(),
	stateColumnChooser: { editedColumns: [], selectAll: false },
}));

const t = jest.fn((_, translationValue) => translationValue.defaultValue);

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
			submitColumnChooser: jest.fn(),
			t,
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
			submitColumnChooser: jest.fn(),
			t,
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
