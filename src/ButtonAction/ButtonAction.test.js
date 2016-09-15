import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Icon } from 'react-cmf';
import { shallow } from 'enzyme';
import ButtonAction from './ButtonAction';

describe('ButtonAction', () => {
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

	it('should display a button', () => {
		const wrapper = shallow(
			<ButtonAction
				action="test"
			/>, { context }
		);
		expect(wrapper.containsMatchingElement(<Button>Test</Button>)).toEqual(true);
	});
	it('should support onClick', () => {
		const wrapper = shallow(
			<ButtonAction
				onClick={onClick}
				action="test"
			/>, { context }
		);
		expect(clicked).toBe(false);
		wrapper.simulate('click');
		expect(clicked).toBe(true);
	});
	it('should display an icon if icon props is passed', () => {
		const wrapper = shallow(
			<ButtonAction
				action="test"
				icon
			/>, { context }
		);
		expect(wrapper.containsMatchingElement(<Icon name="icon-test" />)).toEqual(true);
	});
	it('should not display icon if an icon props is not passed', () => {
		const wrapper = shallow(
			<ButtonAction
				action="test"
			/>, { context }
		);
		expect(wrapper.containsMatchingElement(<Icon name="icon-test" />)).toEqual(false);
	});
	it('should support all props of the Button', () => {
		const wrapper = shallow(
			<ButtonAction btn="primary" />,
			{ context }
		);
		expect(wrapper.containsMatchingElement(<Button bsStyle="primary"></Button>)).toEqual(true);
	});
});

