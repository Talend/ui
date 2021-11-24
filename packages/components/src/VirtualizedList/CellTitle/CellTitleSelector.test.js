import React from 'react';
import { shallow } from 'enzyme';

import { cellTitleDisplayModes } from '../utils/constants';
import CellTitleSelector from './CellTitleSelector.component';

const { TITLE_MODE_TEXT, TITLE_MODE_INPUT } = cellTitleDisplayModes;

describe('CellTitleSelector', () => {
	it('should render the input', () => {
		// given
		const rowData = { id: 1 };

		// when
		const wrapper = shallow(
			<CellTitleSelector
				id="my-title"
				cellData="my value"
				className="my-title-classname"
				displayMode={TITLE_MODE_INPUT}
				onEditCancel={jest.fn()}
				onEditSubmit={jest.fn()}
				rowData={rowData}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render the button', () => {
		// given
		const rowData = { id: 1 };

		// when
		const wrapper = shallow(
			<CellTitleSelector
				id="my-title"
				cellData="my value"
				className="my-title-classname"
				displayMode={TITLE_MODE_TEXT}
				onClick={jest.fn()}
				rowData={rowData}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger callback on button click', () => {
		// given
		const rowData = { id: 1 };
		const onClick = jest.fn();
		const clickEvent = { button: 0 };
		const wrapper = shallow(
			<CellTitleSelector
				id="my-title"
				cellData="my value"
				className="my-title-classname"
				displayMode={TITLE_MODE_TEXT}
				onClick={onClick}
				rowData={rowData}
			/>,
		);

		// when
		wrapper.find('#my-title-btn').simulate('click', clickEvent);

		// then
		expect(onClick).toBeCalledWith(clickEvent, rowData);
	});

	it('should render the simple text', () => {
		// when
		const wrapper = shallow(
			<CellTitleSelector
				id="my-title"
				cellData="my value"
				className="my-title-classname"
				displayMode={TITLE_MODE_TEXT}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
