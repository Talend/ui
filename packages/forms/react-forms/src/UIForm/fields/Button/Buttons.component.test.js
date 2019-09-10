import React from 'react';
import { shallow } from 'enzyme';

import Buttons from './Buttons.component';

describe('Buttons field', () => {
	it('should render buttons', () => {
		// given
		const schema = {
			widget: 'buttons',
			description: 'My buttons',
			items: [
				{
					title: 'Reset',
					type: 'reset',
					widget: 'button',
					className: 'custom-class-name',
				},
				{
					position: 'right',
					title: 'Test',
					triggers: ['test'],
					type: 'button',
					widget: 'button',
				},
				{
					bsStyle: 'primary',
					title: 'Submit',
					type: 'submit',
					widget: 'button',
				},
			],
		};

		// when
		const wrapper = shallow(
			<Buttons
				id={'myForm'}
				onTrigger={jest.fn()}
				onClick={jest.fn()}
				schema={schema}
				className="extra"
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
