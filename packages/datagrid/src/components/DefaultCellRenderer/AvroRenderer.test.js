import React from 'react';
import { shallow, mount } from 'enzyme';

import AvroRenderer from './AvroRenderer.component';

function DummyComponent() {
	return <span>dummy component</span>;
}

const registryComponents = {
	stringCellRenderer: DummyComponent,
};

function getComponent(id) {
	return registryComponents[id];
}

describe('#AvroRenderer', () => {
	it('should render AvroRenderer and load Injected Component stringCellRenderer', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{ stringCellRenderer: 'stringCellRenderer' }}
				colDef={{ avro: { type: { type: 'string' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should mount DummyComponent', () => {
		const wrapper = mount(
			<AvroRenderer
				avroRenderer={{ stringCellRenderer: 'stringCellRenderer' }}
				colDef={{ avro: { type: { type: 'string' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.find('DummyComponent').length).toBe(1);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
