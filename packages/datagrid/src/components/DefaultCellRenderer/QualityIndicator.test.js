import React from 'react';
import { shallow } from 'enzyme';

import QualityIndicator from './QualityIndicator.component';
import { QUALITY_INVALID_KEY, QUALITY_VALID_KEY } from '../../constants';

describe('#QualityIndicator', () => {
	it('should render when quality index is QUALITY_INVALID_KEY', () => {
		const wrapper = shallow(<QualityIndicator qualityIndex={QUALITY_INVALID_KEY} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should not render when quality index is different of QUALITY_INVALID_KEY', () => {
		const wrapper = shallow(<QualityIndicator qualityIndex={QUALITY_VALID_KEY} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
