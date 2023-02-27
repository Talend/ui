import React from 'react';
import { render, screen, configure } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cases from 'jest-in-case';
import { withListGesture } from './withListGesture';
import List from '../../__mocks__/list';

configure({ testIdAttribute: 'data-test' });

function getComponentWithGesture(loop) {
	const ComponentWithGesture = withListGesture(List, loop);
	return ComponentWithGesture;
}

describe('List Gesture HOC', () => {
	it('should wrap Tree component', () => {
		// then
		expect(getComponentWithGesture().displayName).toBe('ListGesture(List)');
	});

	async function testFocus({ elementPosition, expectedActivePosition, keyCode, loop }) {
		// given
		const ComponentWithGesture = getComponentWithGesture(loop);
		render(<ComponentWithGesture />);
		const element = screen.getByTestId(`item-${elementPosition}`);
		// when
		await userEvent.click(element);
		await userEvent.keyboard(`[${keyCode}]`);

		// then
		expect(screen.getByTestId(`item-${expectedActivePosition}`)).toHaveFocus();
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
			keyCode: 'ArrowDown',
		},
		{
			name: 'should focus previous item on up keydown',
			elementPosition: 1,
			expectedActivePosition: 0,
			keyCode: 'ArrowUp',
		},
		{
			name: 'should focus on 1st item on down keydown at the last item when loop',
			elementPosition: 3,
			expectedActivePosition: 0,
			keyCode: 'ArrowDown',
			loop: true,
		},
		{
			name: 'should focus on last item on up keydown at the 1st item when loop',
			elementPosition: 0,
			expectedActivePosition: 3,
			keyCode: 'ArrowUp',
			loop: true,
		},
	]);
});
