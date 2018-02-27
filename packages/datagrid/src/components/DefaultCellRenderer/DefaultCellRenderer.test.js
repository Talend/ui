import React from 'react';
import { shallow } from 'enzyme';

import {
	TALEND_QUALITY_EMPTY_KEY,
	TALEND_QUALITY_INVALID_KEY,
	TALEND_QUALITY_VALID_KEY,
} from '../../constants';

import DefaultCellRenderer from './DefaultCellRenderer.component';
import QualityIndicator from './QualityIndicator.component';

function getComponent() {}

describe('#DefaultCellRenderer', () => {
	it('should render DefaultCellRenderer with TALEND_QUALITY_EMPTY_KEY quality cell', () => {
		const wrapper = shallow(
			<DefaultCellRenderer
				avroRenderer={{ stringCellRenderer: 'StringRenderer' }}
				colDef={{ avro: { type: 'string' } }}
				value={{ quality: TALEND_QUALITY_EMPTY_KEY }}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find(QualityIndicator).length).toBe(1);
	});

	it('should render DefaultCellRenderer with TALEND_QUALITY_INVALID_KEY quality cell', () => {
		const wrapper = shallow(
			<DefaultCellRenderer
				avroRenderer={{ stringCellRenderer: 'StringRenderer' }}
				colDef={{ avro: { type: 'string' } }}
				value={{ quality: TALEND_QUALITY_INVALID_KEY }}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find(QualityIndicator).length).toBe(1);
	});

	it('should render DefaultCellRenderer with TALEND_QUALITY_VALID_KEY quality cell', () => {
		const wrapper = shallow(
			<DefaultCellRenderer
				avroRenderer={{ stringCellRenderer: 'StringRenderer' }}
				colDef={{ avro: { type: 'string' } }}
				value={{ quality: TALEND_QUALITY_VALID_KEY }}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find(QualityIndicator).length).toBe(0);
	});
});
