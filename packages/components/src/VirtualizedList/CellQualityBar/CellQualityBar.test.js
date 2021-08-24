import React from 'react';
import { mount } from 'enzyme';
import noop from 'lodash/noop';

import { CellQualityBar } from './CellQualityBar.component';

const props = {
	invalid: 1,
	empty: 2,
	valid: 3,
	na: 4,
	onClick: noop,
	getDataFeature: noop,
};

describe('CellQualityBar', () => {
	it('should render an empty quality bar', () => {
		const wrapper = mount(<CellQualityBar />);
		expect(wrapper.html()).toBe(null);
	});

	it('should render a valid quality bar', () => {
		const wrapper = mount(<CellQualityBar cellData={props} />);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
