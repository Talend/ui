import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';

import Action from './Action.connect';

describe('Action', () => {
	it('should render from name props keeping extra props', () => {
		const context = mock.context();
		const wrapper = shallow(
			<Action name="menu:article" extra="foo" />,
			{ context }
		);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});
