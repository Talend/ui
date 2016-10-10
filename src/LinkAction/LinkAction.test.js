import React from 'react';
import { Icon } from 'react-cmf';
import { shallow } from 'enzyme';
import LinkAction from './LinkAction';

describe('LinkAction', () => {
	let clicked = false;
	function onClick() {
		clicked = true;
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
		},
	};
	beforeEach(() => {
		clicked = false;
	});

	it('should display a clickable link', () => {
		const wrapper = shallow(
			<LinkAction
				action="test"
				onClick={onClick}
			/>, { context }
		);
		expect(wrapper.containsMatchingElement(<a><span>Test</span></a>)).toEqual(true);
		expect(wrapper.containsMatchingElement(<Icon name="icon-test" />)).toEqual(false);
		expect(clicked).toEqual(false);
		wrapper.simulate('click');
		expect(clicked).toEqual(true);
	});
	it('should display an icon if icon props is passed', () => {
		const wrapper = shallow(
			<LinkAction
				action="test"
				icon
			/>, { context }
		);
		expect(wrapper.containsMatchingElement(<Icon name="icon-test" />)).toEqual(true);
	});
	it('should not display icon if an icon props is not passed', () => {
		const wrapper = shallow(
			<LinkAction
				action="test"
			/>, { context }
		);
		expect(wrapper.containsMatchingElement(<Icon name="icon-test" />)).toEqual(false);
	});
});
