import React from 'react';
import { mount } from 'enzyme';
import keycode from 'keycode';
import cases from 'jest-in-case';
import WithDynamicListGesture from './withDynamicListGesture';

const LIST_SIZE = 5;

class ComponentWithGesture extends React.Component {
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
	function testFocus({ elementIndex, expectedActiveIndex, keyCode }) {
		// given
		const wrapper = mount(<ComponentWithGesture />, { attachTo: document.body });
		const event = { keyCode };
		const element = wrapper.find(`#item-${elementIndex}`);

		// when
		element.simulate('keydown', event);

		// then
		expect(document.activeElement.getAttribute('id')).toBe(`item-${expectedActiveIndex}`);
		wrapper.detach();
	}

	cases('focus', testFocus, [
		{
			name: 'should focus previous item on up keydown',
			elementIndex: 22,
			expectedActiveIndex: 21,
			keyCode: keycode.codes.up,
		},
		{
			name: 'should focus next item on down keydown',
			elementIndex: 22,
			expectedActiveIndex: 23,
			keyCode: keycode.codes.down,
		},
		{
			name: 'should go to previous page on up keydown',
			elementIndex: 20,
			expectedActiveIndex: 19,
			keyCode: keycode.codes.up,
		},
		{
			name: 'should go to previous page on down keydown',
			elementIndex: 24,
			expectedActiveIndex: 25,
			keyCode: keycode.codes.down,
		},
		{
			name: 'should go to previous page on pageUp keydown',
			elementIndex: 22,
			expectedActiveIndex: 17,
			keyCode: keycode.codes['page up'],
		},
		{
			name: 'should go to previous page on pageDown keydown',
			elementIndex: 22,
			expectedActiveIndex: 27,
			keyCode: keycode.codes['page down'],
		},
	]);
});
