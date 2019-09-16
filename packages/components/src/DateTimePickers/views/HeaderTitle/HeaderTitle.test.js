import React from 'react';
import { shallow } from 'enzyme';

import HeaderTitle from './HeaderTitle.component';
import { ActionDropdown } from '../../../Actions';

describe('HeaderTitle', () => {
	it('should render a span and ActionDropdown', () => {
		// When
		const wrapper = shallow(<HeaderTitle monthIndex={8} year={2012} />);

		// Then
		expect(wrapper.name()).toEqual('div');
		expect(wrapper.find('span').exists()).toBe(true);
		expect(wrapper.find(ActionDropdown).exists()).toBe(true);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a button', () => {
		// When
		const wrapper = shallow(
			<HeaderTitle monthIndex={8} year={2012} button={{ whateverButtonProp: 'whateverValue' }} />,
		);

		// Then
		expect(wrapper.name()).toEqual('button');
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render the correct date and format', () => {
		const wrapperSpanAction = shallow(<HeaderTitle monthIndex={2} year={2001} />);
		const wrapperButton = shallow(
			<HeaderTitle monthIndex={11} year={2002} button={{ whateverButtonProp: 'whateverValue' }} />,
		);
		expect(
			wrapperSpanAction
				.find('span')
				.first()
				.text(),
		).toEqual('March');
		expect(
			wrapperSpanAction
				.find(ActionDropdown)
				.first()
				.props().label,
		).toEqual('2001');
		expect(wrapperButton.text()).toBe('December 2002');
	});
});
