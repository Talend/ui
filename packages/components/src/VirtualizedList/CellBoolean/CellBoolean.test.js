import React from 'react';
import { shallow } from 'enzyme';

import CellBoolean, { DISPLAY_MODE } from './CellBoolean.component';

describe('CellBoolean', () => {
	it('should render an empty cell', () => {
		const wrapper = shallow(<CellBoolean />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render an icon cell in a truthy case', () => {
		const wrapper = shallow(
			<CellBoolean cellData columnData={{ displayMode: DISPLAY_MODE.ICON }} />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render an icon cell in a falsy case', () => {
		const wrapper = shallow(<CellBoolean columnData={{ displayMode: DISPLAY_MODE.ICON }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a truthy value', () => {
		const wrapper = shallow(<CellBoolean cellData />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a falsy value', () => {
		const wrapper = shallow(<CellBoolean cellData={false} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
