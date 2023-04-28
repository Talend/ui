import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';

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

	it('should render disabled checkbox', () => {
		// when
		render(
			<CellCheckbox
				cellData={false}
				columnData={{ ...columnData, getRowState: () => ({ disabled: true }) }}
				rowIndex={25}
			/>,
		);

		// then
		expect(screen.getByRole('checkbox')).toBeDisabled();
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
