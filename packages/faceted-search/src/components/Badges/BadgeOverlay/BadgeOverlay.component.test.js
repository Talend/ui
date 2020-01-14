/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { BadgeOverlay } from './BadgeOverlay.component';
import getDefaultT from '../../../translate';

describe('BadgeOverlay', () => {
	it('should render the html output in the default state', () => {
		// Given
		const props = {
			id: 'my-id',
			label: 'my label',
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(<BadgeOverlay {...props}>children</BadgeOverlay>);
		// Then
		expect(
			wrapper
				.find('Overlay')
				.at(0)
				.prop('show'),
		).toBe(false);
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render the html output with children as function', () => {
		// Given
		const childrenAsFunc = () => <div id="my-children">hello world</div>;
		const props = {
			id: 'my-id',
			label: 'my label',
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(<BadgeOverlay {...props}>{() => childrenAsFunc()}</BadgeOverlay>);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should change the show props overlay', () => {
		// Given
		const props = {
			id: 'my-id',
			label: 'my label',
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(<BadgeOverlay {...props}>children</BadgeOverlay>);
		expect(
			wrapper
				.find('Overlay')
				.at(0)
				.prop('show'),
		).toBe(false);
		act(() => {
			wrapper.find('button').simulate('click');
		});
		wrapper.update();
		// Then
		expect(
			wrapper
				.find('Overlay')
				.at(0)
				.prop('show'),
		).toBe(true);
	});
	it('should trigger a callback when button clicked', () => {
		// Given
		const onChange = jest.fn();
		const props = {
			label: 'my label',
			id: 'my-id',
			t: getDefaultT(),
			onChange,
		};
		// When
		const wrapper = mount(<BadgeOverlay {...props}>children</BadgeOverlay>);
		expect(
			wrapper
				.find('Overlay')
				.at(0)
				.prop('show'),
		).toBe(false);
		wrapper.find('button').simulate('click');
		// Then
		expect(onChange.mock.calls.length).toBe(1);
		expect(onChange.mock.calls[0][1]).toBe(true);
	});
	it('should render with the overlay showed', () => {
		// Given
		const props = {
			label: 'my label',
			id: 'my-id',
			initialOpened: true,
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(<BadgeOverlay {...props}>children</BadgeOverlay>);
		// Then
		expect(
			wrapper
				.find('Overlay')
				.at(0)
				.prop('show'),
		).toBe(true);
	});
});
