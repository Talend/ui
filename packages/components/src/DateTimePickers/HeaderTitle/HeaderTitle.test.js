import React from 'react';
import { shallow } from 'enzyme';

import HeaderTitle from './HeaderTitle.component';

describe('HeaderTitle', () => {
	it('should render a span', () => {
		// When
		const wrapper = shallow(
			<HeaderTitle />
		);

		// Then
		expect(wrapper.name()).toEqual('span');
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a button', () => {
		// When
		const wrapper = shallow(
			<HeaderTitle button={{ whateverButtonProp: 'whateverValue' }} />
		);

		// Then
		expect(wrapper.name()).toEqual('button');
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
