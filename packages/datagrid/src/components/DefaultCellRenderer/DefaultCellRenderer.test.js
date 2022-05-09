import React from 'react';
import { shallow } from 'enzyme';

import { QUALITY_EMPTY_KEY } from '../../constants';

import DefaultCellRenderer from './DefaultCellRenderer.component';

describe('#DefaultCellRenderer', () => {
	it('should render DefaultCellRenderer', () => {
		const wrapper = shallow(
			<DefaultCellRenderer
				avroRenderer={{ stringCellRenderer: 'StringRenderer' }}
				colDef={{ avro: { type: 'string' } }}
				value={{ quality: QUALITY_EMPTY_KEY }}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render the default cell on loading state', () => {
		const wrapper = shallow(<DefaultCellRenderer data={{ loaded: false }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
