import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';

import Action, { mapStateToProps, renderers } from './Action.connect';

describe('Action', () => {
	it('should render from name props keeping extra props', () => {
		const context = mock.context();
		const wrapper = shallow(<Action name="menu:article" extra="foo" />, { context });
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Action.mapStateToProps', () => {
	it('should just export renderers if no actionId and no name', () => {
		const props = mapStateToProps({}, {});
		expect(props).toEqual({ renderers });
	});
	it('should resolve action displayMode', () => {
		const state = mock.state();
		state.cmf.settings.actions = {
			'menu:article': {
				name: 'foo',
				displayMode: 'dropdown',
			},
		};
		const props = mapStateToProps(state, { actionId: 'menu:article' });
		expect(props.actionId).toBe('menu:article');
		expect(props.displayMode).toBe('dropdown');
		expect(props.name).toBeUndefined();
	});
});
