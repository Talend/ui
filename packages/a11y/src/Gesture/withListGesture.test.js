import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cases from 'jest-in-case';
import { withListGesture } from './withListGesture';
import List from '../__mocks__/list';

function getComponentWithGesture(loop) {
	const ComponentWithGesture = withListGesture(List, loop);
	return ComponentWithGesture;
}

describe('List Gesture HOC', () => {
	it('should wrap Tree component', () => {
		// then
		expect(getComponentWithGesture().displayName).toBe('ListGesture(List)');
	});

	async function testFocus({ elementPosition, expectedActivePosition, key, loop }) {
		const user = userEvent.setup();

		// given
		const ComponentWithGesture = getComponentWithGesture(loop);
		render(<ComponentWithGesture />);
		const element = screen.getByTestId(`item-${elementPosition}`);
		// when
		await user.click(element);
		await user.keyboard(`[${key}]`);

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
			key: 'ArrowDown',
		},
		{
			name: 'should focus previous item on up keydown',
			elementPosition: 1,
			expectedActivePosition: 0,
			key: 'ArrowUp',
		},
		{
			name: 'should focus on 1st item on down keydown at the last item when loop',
			elementPosition: 3,
			expectedActivePosition: 0,
			key: 'ArrowDown',
			loop: true,
		},
		{
			name: 'should focus on last item on up keydown at the 1st item when loop',
			elementPosition: 0,
			expectedActivePosition: 3,
			key: 'ArrowUp',
			loop: true,
		},
	]);
});
