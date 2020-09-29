import React from 'react';
import { mount } from 'enzyme';

import CellBoolean, { DISPLAY_MODE } from './CellBoolean.component';

describe('CellBoolean', () => {
	it('should render an empty cell', () => {
		const wrapper = mount(<CellBoolean />);
		expect(wrapper.html()).toBe(null);
	});

	it('should render an check icon for a truthy value in icon mode', () => {
		const wrapper = mount(<CellBoolean cellData columnData={{ displayMode: DISPLAY_MODE.ICON }} />);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render an empty cell for a falsy value in icon mode', () => {
		const wrapper = mount(<CellBoolean columnData={{ displayMode: DISPLAY_MODE.ICON }} />);
		expect(wrapper.html()).toBe(null);
	});

	it('should render a truthy value', () => {
		const wrapper = mount(<CellBoolean cellData />);
		expect(wrapper.text()).toBe('Yes');
	});

	it('should render a falsy value', () => {
		const wrapper = mount(<CellBoolean cellData={false} />);
		expect(wrapper.text()).toBe('No');
	});
});
