import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import CellCheckbox from './CellCheckbox.component';

faker.seed(42);
const columnData = {
	id: faker.random.word(),
	label: faker.random.words(),
	onChange: jest.fn(),
};

describe('CellActions', () => {
	it('should render checked checkbox', () => {
		// when
		const wrapper = shallow(<CellCheckbox cellData columnData={columnData} rowIndex={25} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render unchecked checkbox', () => {
		// when
		const wrapper = shallow(
			<CellCheckbox cellData={false} columnData={columnData} rowIndex={25} />,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should trigger callback on checkbox toggle', () => {
		// given
		const event = { target: faker.random.word() };
		const rowData = { id: 1 };

		// when
		const wrapper = shallow(
			<CellCheckbox cellData columnData={columnData} rowData={rowData} rowIndex={25} />,
		);
		wrapper.find(`#${columnData.id}-25-check`).simulate('change', event);

		// then
		expect(columnData.onChange).toBeCalledWith(event, rowData);
	});
});
