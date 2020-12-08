import React from 'react';
import { mount } from 'enzyme';
import Tooltip from './Tooltip.component';

describe('Tooltip', () => {
	it('Should render', () => {
		const component = mount(
			<Tooltip
				entries={[
					{
						key: 'key1',
						value: 'value1',
					},
				]}
			/>,
		);
		expect(component.html()).toMatchSnapshot();
	});
});
