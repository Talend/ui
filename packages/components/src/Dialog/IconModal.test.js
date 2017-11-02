import PropTypes from 'prop-types';
import React from 'react';
import { shallow } from 'enzyme';

import IconModal from './IconModal.component';

describe('IconModal', () => {
	it('should render an icon', () => {
		const wrapper = shallow(<IconModal name="icon" />);

		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render nothing', () => {
		const wrapper = shallow(<IconModal />);

		expect(wrapper.node).toMatchSnapshot();
	});
});
