import React from 'react';
import { mount } from 'enzyme';
import LinkDispatcher from './LinkDispatcher';

describe('LinkDispatcher', () => {
	let dispatched = false;
	function dispatch() {
		dispatched = true;
	}
	const routes = [];
	function push(route) {
		routes.push(route);
	}
	const state = {
		cmf: {
			settings: {
				actions: {
					test: {
						id: 'test',
						name: 'Test',
						icon: 'icon-test',
					},
				},
			},
		},
	};
	const context = {
		store: {
			getState() {
				return state;
			},
			subscribe() {},
			dispatch,
		},
		router: {
			push,
		},
		registry: {
			'actionCreator:router.push': push,
		},
	};
	const childContextTypes = {
		router: React.PropTypes.object,
		store: React.PropTypes.object,
		registry: React.PropTypes.object,
	};
	beforeEach(() => {
		dispatched = false;
	});
	it('should dispatch an action onclick', () => {
		const wrapper = mount(
			<LinkDispatcher action="test" />, { context, childContextTypes }
		);
		expect(dispatched).toBe(false);
		wrapper.simulate('click');
		expect(dispatched).toBe(true);
	});
});
