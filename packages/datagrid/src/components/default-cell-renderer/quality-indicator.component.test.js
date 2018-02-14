import React from 'react';
import { shallow } from 'enzyme';

import QualityIndicator from './quality-indicator.component';
import { TALEND_QUALITY_EMPTY_KEY, TALEND_QUALITY_INVALID_KEY } from '../constants';

describe('#DefaultBooleanCellRenderer', () => {
	it('should render DefaultBooleanCellRenderer', () => {
		const wrapper = shallow(
			<QualityIndicator value={TALEND_QUALITY_INVALID_KEY} tooltip="Incorrect value" />,
		);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should handle when TALEND_QUALITY_INVALID_KEY value', () => {
		const wrapper = shallow(
			<QualityIndicator value={TALEND_QUALITY_INVALID_KEY} tooltip="Incorrect value" />,
		);
		// then
		expect(wrapper.find('.td-cell-quality-indicator-invalid').length).toBe(1);
		expect(wrapper.find('.td-cell-quality-indicator-empty').length).toBe(0);
	});

	it('should handle when TALEND_QUALITY_EMPTY_KEY value', () => {
		const wrapper = shallow(
			<QualityIndicator value={TALEND_QUALITY_EMPTY_KEY} tooltip="Empty value" />,
		);
		// then
		expect(wrapper.find('.td-cell-quality-indicator-invalid').length).toBe(0);
		expect(wrapper.find('.td-cell-quality-indicator-empty').length).toBe(1);
	});
});
