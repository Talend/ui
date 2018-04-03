import React from 'react';
import { shallow } from 'enzyme';

import { QualityIndicatorComponent } from './QualityIndicator.component';
import { QUALITY_INVALID_KEY } from '../../constants';

describe('#QualityIndicator', () => {
	it('should render QualityIndicator', () => {
		const wrapper = shallow(
			<QualityIndicatorComponent value={QUALITY_INVALID_KEY} tooltip="Incorrect value" />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should handle when QUALITY_INVALID_KEY value', () => {
		const wrapper = shallow(
			<QualityIndicatorComponent value={QUALITY_INVALID_KEY} tooltip="Incorrect value" />,
		);

		expect(wrapper.find('.theme-td-cell-quality-indicator-invalid').length).toBe(1);
	});
});
