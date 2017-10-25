import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import { cellTitleDisplayModes } from '../utils/constants';
import CellTitleSelector from './CellTitleSelector.component';

const { TITLE_MODE_TEXT, TITLE_MODE_INPUT } = cellTitleDisplayModes;

faker.seed(42);
describe('CellTitleSelector', () => {
	it('should render the input', () => {
		// given
		const rowData = { id: 1 };

		// when
		const wrapper = shallow(
			<CellTitleSelector
				id={faker.random.word()}
				cellData={faker.random.words()}
				className={'my-title-classname'}
				displayMode={TITLE_MODE_INPUT}
				onEditCancel={jest.fn()}
				onEditSubmit={jest.fn()}
				rowData={rowData}
			/>,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render the button', () => {
		// given
		const rowData = { id: 1 };

		// when
		const wrapper = shallow(
			<CellTitleSelector
				id={faker.random.word()}
				cellData={faker.random.words()}
				className={'my-title-classname'}
				displayMode={TITLE_MODE_TEXT}
				onClick={jest.fn()}
				rowData={rowData}
			/>,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should trigger callback on button click', () => {
		// given
		const rowData = { id: 1 };
		const onClick = jest.fn();
		const clickEvent = { button: 0 };

		const id = faker.lorem.word();

		const wrapper = shallow(
			<CellTitleSelector
				id={id}
				cellData={'my value'}
				className={'my-title-classname'}
				displayMode={TITLE_MODE_TEXT}
				onClick={onClick}
				rowData={rowData}
			/>,
		);

		// when
		wrapper.find(`#${id}-btn`).simulate('click', clickEvent);

		// then
		expect(onClick).toBeCalledWith(clickEvent, rowData);
	});

	it('should render the simple text', () => {
		// when
		const wrapper = shallow(
			<CellTitleSelector
				id={faker.random.word()}
				cellData={faker.random.words()}
				className={'my-title-classname'}
				displayMode={TITLE_MODE_TEXT}
			/>,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});
});
