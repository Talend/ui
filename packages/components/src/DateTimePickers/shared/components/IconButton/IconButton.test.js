import React from 'react';
import { shallow } from 'enzyme';

import IconButton from './IconButton.component';

describe('IconButton', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<IconButton
				icon={{
					name: 'whatever',
					transform: 'rotate-180',
					className: 'my-little-icon-class',
				}}
				className="my-little-button-class"
				onClick={() => {}}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
