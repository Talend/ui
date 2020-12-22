import React from 'react';
import { mount } from 'enzyme';
import TooltipContent from './TooltipContent.component';

describe('TooltipContent', () => {
	it('Should render', () => {
		const component = mount(
			<TooltipContent
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
