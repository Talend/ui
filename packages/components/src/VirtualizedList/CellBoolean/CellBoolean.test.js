import React from 'react';
import { shallow } from 'enzyme';

import CellBoolean from './CellBoolean.component';

describe('CellBoolean', () => {
	it('should render an empty cell', () => {
		const wrapper = shallow(<CellBoolean />);

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
