import React from 'react';
import { shallow } from 'enzyme';

import QualityIndicator from './QualityIndicator.component';
import { TALEND_QUALITY_EMPTY_KEY, TALEND_QUALITY_INVALID_KEY } from '../../constants';

describe('#QualityIndicator', () => {
	it('should render QualityIndicator', () => {
		const wrapper = shallow(
			<QualityIndicator value={TALEND_QUALITY_INVALID_KEY} tooltip="Incorrect value" />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should handle when TALEND_QUALITY_INVALID_KEY value', () => {
		const wrapper = shallow(
			<QualityIndicator value={TALEND_QUALITY_INVALID_KEY} tooltip="Incorrect value" />,
		);

		expect(wrapper.find('.theme-td-cell-quality-indicator-invalid').length).toBe(1);
		expect(wrapper.find('.theme-td-cell-quality-indicator-empty').length).toBe(0);
	});

	it('should handle when TALEND_QUALITY_EMPTY_KEY value', () => {
		const wrapper = shallow(
			<QualityIndicator value={TALEND_QUALITY_EMPTY_KEY} tooltip="Empty value" />,
		);

		expect(wrapper.find('.theme-td-cell-quality-indicator-invalid').length).toBe(0);
		expect(wrapper.find('.theme-td-cell-quality-indicator-empty').length).toBe(1);
	});
});
