import React from 'react';
import { mount } from 'enzyme';
import KeyValueTooltip from './KeyValueTooltip.component';

describe('TooltipContent', () => {
	it('Should render', () => {
		const component = mount(
			<KeyValueTooltip
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
