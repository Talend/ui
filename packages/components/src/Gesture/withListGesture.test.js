import React from 'react';
import { mount } from 'enzyme';
import keycode from 'keycode';
import cases from 'jest-in-case';
import withListGesture from './withListGesture';
import List from '../../__mocks__/list';

const ComponentWithGesture = withListGesture(List);

describe('List Gesture HOC', () => {
	it('should wrap Tree component', () => {
		// then
		expect(ComponentWithGesture.displayName).toBe('ListGesture(List)');
	});

	function testFocus({ elementPosition, expectedActivePosition, keyCode }) {
		// given
		const wrapper = mount(<ComponentWithGesture />);
		const event = { keyCode };
		const element = wrapper.find(`#item-${elementPosition}`);

		// when
		element.simulate('keydown', event);

		// then
		expect(document.activeElement.getAttribute('id')).toBe(`item-${expectedActivePosition}`);
	}

	/**
	 * The current data gives this tree. Legend : (level, poinset)
	 *   - item-0
	 *   - group
	 *     - item-1
	 *   - item-2
	 *   - item-3
	 */
	cases('focus', testFocus, [
		{
			name: 'should focus next item on down keydown',
			elementPosition: 0,
			expectedActivePosition: 1,
			keyCode: keycode.codes.down,
		},
		{
			name: 'should focus previous item on up keydown',
			elementPosition: 1,
			expectedActivePosition: 0,
			keyCode: keycode.codes.up,
		},
	]);
});
