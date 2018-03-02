import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';

import Action, { mapStateToProps } from './Action.connect';

describe('Action', () => {
	it('should render from name props keeping extra props', () => {
		const context = mock.context();
		const wrapper = shallow(<Action actionId="menu:article" extra="foo" />, { context });
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Action.mapStateToProps', () => {
	it('should resolve action displayMode', () => {
		const state = mock.state();
		state.cmf.settings.actions = {
			'menu:article': {
				name: 'foo',
				displayMode: 'dropdown',
			},
		};
		const props = mapStateToProps(state, { actionId: 'menu:article' });
		expect(props.displayMode).toBe('dropdown');
		expect(props.name).toBeUndefined();
	});
});
