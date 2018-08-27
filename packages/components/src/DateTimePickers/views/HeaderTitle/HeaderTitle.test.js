import React from 'react';
import { shallow } from 'enzyme';

import { mockDate, restoreDate } from '../../shared/utils/test/dateMocking';
import HeaderTitle from './HeaderTitle.component';

describe('HeaderTitle', () => {
	beforeAll(() => {
		mockDate();
	});
	afterAll(() => {
		restoreDate();
	});

	it('should render a span', () => {
		// When
		const wrapper = shallow(<HeaderTitle monthIndex={8} year={2012} />);

		// Then
		expect(wrapper.name()).toEqual('span');
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
		const wrapperSpan = shallow(<HeaderTitle monthIndex={2} year={2001} />);
		const wrapperButton = shallow(<HeaderTitle monthIndex={11} year={2002} />);

		expect(wrapperSpan.text()).toBe('March 2001');
		expect(wrapperButton.text()).toBe('December 2002');
	});
});
