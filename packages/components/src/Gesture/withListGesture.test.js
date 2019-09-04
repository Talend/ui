import React from 'react';
import { mount } from 'enzyme';
import keycode from 'keycode';
import cases from 'jest-in-case';
import withListGesture from './withListGesture';
import List from '../../__mocks__/list';


function getComponentWithGesture(loop) {
	const ComponentWithGesture = withListGesture(List, loop);
	return ComponentWithGesture;
}


describe('List Gesture HOC', () => {
	it('should wrap Tree component', () => {
		// then
		expect(getComponentWithGesture().displayName).toBe('ListGesture(List)');
	});

	function testFocus({ elementPosition, expectedActivePosition, keyCode, loop }) {
		// given
		const ComponentWithGesture = getComponentWithGesture(loop);
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
		{
			name: 'should focus on 1st item on down keydown at the last item when loop',
			elementPosition: 3,
			expectedActivePosition: 0,
			keyCode: keycode.codes.down,
			loop: true,
		},
		{
			name: 'should focus on last item on up keydown at the 1st item when loop',
			elementPosition: 0,
			expectedActivePosition: 3,
			keyCode: keycode.codes.up,
			loop: true,
		},
	]);
});
