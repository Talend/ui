import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';

import { QUALITY_EMPTY_KEY } from '../../constants';

import DefaultCellRenderer from './DefaultCellRenderer.component';
import AvroRenderer from './AvroRenderer.component';
import QualityIndicator from './QualityIndicator.component';

function getComponent() {}

describe('#DefaultCellRenderer', () => {
	it('should render DefaultCellRenderer', () => {
		const wrapper = shallow(
			<DefaultCellRenderer
				avroRenderer={{ stringCellRenderer: 'StringRenderer' }}
				colDef={{ avro: { type: 'string' } }}
				getComponent={getComponent}
				value={{ quality: QUALITY_EMPTY_KEY }}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render the default cell on loading state', () => {
		const wrapper = shallow(<DefaultCellRenderer data={{ loaded: false }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should accept immutable value', () => {
		const wrapper = shallow(
			<DefaultCellRenderer
				avroRenderer={{ stringCellRenderer: 'StringRenderer' }}
				colDef={{ avro: { type: 'string' } }}
				value={Immutable.Map({ quality: QUALITY_EMPTY_KEY })}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.find(AvroRenderer).props().data).toEqual({ quality: QUALITY_EMPTY_KEY });
		expect(wrapper.find(QualityIndicator).props().qualityIndex).toEqual(QUALITY_EMPTY_KEY);
	});
});
