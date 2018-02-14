import React from 'react';
import { shallow } from 'enzyme';

import DefaultTypeRenderer from './avro-renderer.component';

function getComponent() {}

describe('#DefaultTypeRenderer', () => {
	it('should render DefaultTypeRenderer and load Injected Component stringCellRenderer', () => {
		const wrapper = shallow(
			<DefaultTypeRenderer
				avroRenderer={{ stringCellRenderer: 'stringCellRenderer' }}
				colDef={{ avro: { type: { type: 'string' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
