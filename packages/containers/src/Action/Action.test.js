import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';

import Action from './Action.component';

jest.mock(
	'@talend/react-components',
	() => ({ Action: props => (<button className="tc-action" {...props} />) })
);

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
