import React from 'react';
import { shallow } from 'enzyme';
import mock from 'react-cmf/lib/mock';

import Action from './Action.component';

jest.mock('react-talend-components');
jest.mock('react-dom');

describe('Action', () => {
	it('should render from name props', () => {
		const context = mock.context();
		const wrapper = shallow(
			<Action name="menu:article" />,
			{ context }
		);
		expect(wrapper.root.node).toMatchSnapshot();
	});
	it('should render null if not available', () => {
		const context = mock.context();
		const wrapper = shallow(
			<Action available={false} />,
			{ context }
		);
		expect(wrapper.root.node).toBe(null);
	});
});
