import PropTypes from 'prop-types';
import React from 'react';
import { shallow } from 'enzyme';

import DescriptionModal from './DescriptionModal.component';

describe('DescriptionModal', () => {
	it('should render a description & a text highlight', () => {
		const props = {
			text: 'hello',
			highlight: 'world',
		};
		const wrapper = shallow(<DescriptionModal description={props} />);

		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render a description', () => {
		const props = {
			text: 'hello',
		};
		const wrapper = shallow(<DescriptionModal description={props} />);

		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render nothing', () => {
		const wrapper = shallow(<DescriptionModal />);

		expect(wrapper.node).toMatchSnapshot();
	});
});
