import React from 'react';
import { shallow } from 'enzyme';

import { QUALITY_EMPTY_KEY } from '../../constants';

import DefaultCellRenderer from './DefaultCellRenderer.component';

function getComponent() {}

describe('#DefaultCellRenderer', () => {
	it('should render DefaultCellRenderer', () => {
		const wrapper = shallow(
			<DefaultCellRenderer
				avroRenderer={{ stringCellRenderer: 'StringRenderer' }}
				colDef={{ avro: { type: 'string' } }}
				value={{ quality: QUALITY_EMPTY_KEY }}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render the default cell on loading state', () => {
		const wrapper = shallow(<DefaultCellRenderer data={{ loading: true }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
