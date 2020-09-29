import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from './Toolbar.component';

describe('Toolbar component snaps', () => {
	it('should render Toolbar with every widgets', () => {
		const wrapper = shallow(<Toolbar name={{}} sort={{}} state={{}} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render Toolbar without name widget', () => {
		const wrapper = shallow(<Toolbar sort={{}} state={{}} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render Toolbar without sort widgets', () => {
		const wrapper = shallow(<Toolbar name={{}} state={{}} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render Toolbar without state widgets', () => {
		const wrapper = shallow(<Toolbar name={{}} sort={{}} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
