import { Component } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cases from 'jest-in-case';
import { WithDynamicListGesture } from './withDynamicListGesture';

const LIST_SIZE = 5;

class ComponentWithGesture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start: 20,
		};

		this.goToPreviousPage = this.setStart.bind(this, -LIST_SIZE);
		this.goToNextPage = this.setStart.bind(this, LIST_SIZE);
	}

	setStart(pace, callback) {
		this.setState(({ start }) => ({ start: start + pace }), callback);
	}

	renderListItems(onKeyDown) {
		const listItems = [];
		for (let i = 0; i < LIST_SIZE; i += 1) {
			const num = this.state.start + i;
			listItems.push(
				<li key={num}>
					<button
						data-testid={`item-${num}`}
						id={`item-${num}`}
						onKeyDown={event => onKeyDown(event, { index: i, size: LIST_SIZE })}
					>
						{num}
					</button>
				</li>,
			);
		}
		return listItems;
	}

	render() {
		return (
			<WithDynamicListGesture
				goToPreviousPage={this.goToPreviousPage}
				goToNextPage={this.goToNextPage}
			>
				{onKeyDown => <ol>{this.renderListItems(onKeyDown)}</ol>}
			</WithDynamicListGesture>
		);
	}
}

describe('List Gesture HOC', () => {
	async function testFocus({ elementIndex, expectedActiveIndex, key }) {
		const user = userEvent.setup();

		// given
		render(<ComponentWithGesture />);
		const element = screen.getByTestId(`item-${elementIndex}`);

		// when
		await user.click(element);
		await user.keyboard(`[${key}]`);

		// then
		expect(screen.getByTestId(`item-${expectedActiveIndex}`)).toHaveFocus();
	}

	cases('focus', testFocus, [
		{
			name: 'should focus previous item on up keydown',
			elementIndex: 22,
			expectedActiveIndex: 21,
			key: 'ArrowUp',
		},
		{
			name: 'should focus next item on down keydown',
			elementIndex: 22,
			expectedActiveIndex: 23,
			key: 'ArrowDown',
		},
		{
			name: 'should go to previous page on up keydown',
			elementIndex: 20,
			expectedActiveIndex: 19,
			key: 'ArrowUp',
		},
		{
			name: 'should go to previous page on down keydown',
			elementIndex: 24,
			expectedActiveIndex: 25,
			key: 'ArrowDown',
		},
		{
			name: 'should go to previous page on pageUp keydown',
			elementIndex: 22,
			expectedActiveIndex: 17,
			key: 'PageUp',
		},
		{
			name: 'should go to previous page on pageDown keydown',
			elementIndex: 22,
			expectedActiveIndex: 27,
			key: 'PageDown',
		},
	]);
});
