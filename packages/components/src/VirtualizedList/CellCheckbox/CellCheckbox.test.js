import React from 'react';
import { shallow } from 'enzyme';

import CellCheckbox from './CellCheckbox.component';

const columnData = {
	id: 'my-checkbox',
	label: 'My Test Check',
	onChange: jest.fn(),
};

describe('CellActions', () => {
	it('should render checked checkbox', () => {
		// when
		const wrapper = shallow(<CellCheckbox cellData columnData={columnData} rowIndex={25} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render unchecked checkbox', () => {
		// when
		const wrapper = shallow(
			<CellCheckbox cellData={false} columnData={columnData} rowIndex={25} />,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render radio button', () => {
		// when
		const wrapper = shallow(
			<CellCheckbox
				cellData={false}
				columnData={{ ...columnData, selectionMode: 'SINGLE' }}
				rowIndex={25}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger callback on checkbox toggle', () => {
		// given
		const event = { target: 'lol' };
		const rowData = { id: 1 };

		// when
		const wrapper = shallow(
			<CellCheckbox cellData columnData={columnData} rowData={rowData} rowIndex={25} />,
		);
		wrapper.find('#my-checkbox-25-check').simulate('change', event);

		// then
		expect(columnData.onChange).toBeCalledWith(event, rowData);
	});
});
