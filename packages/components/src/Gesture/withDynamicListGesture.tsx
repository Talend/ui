import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { focusOn } from './focus';

function getAllItems(ref: HTMLElement) {
	return ref.querySelectorAll('li > button');
}

function focusOnListItem(ref: HTMLElement, index) {
	const listItem = getAllItems(ref)[index];
	focusOn(listItem);
}

function focusOnPreviousItem(ref: HTMLElement, { index, size }, goToPreviousPage: () => void) {
	const nextIndex = index - 1;
	if (nextIndex < 0) {
		goToPreviousPage(() => {
			focusOnListItem(ref, size - 1);
		});
	}
	focusOnListItem(ref, nextIndex);
}

function focusOnNextItem(ref: HTMLElement, { index, size }, goToNextPage: () => void) {
	const nextIndex = index + 1;
	if (nextIndex >= size) {
		goToNextPage(() => {
			focusOnListItem(ref, 0);
		});
	}
	focusOnListItem(ref, nextIndex);
}

function focusOnNextPage(ref: HTMLElement, { index }, goToNextPage: () => void) {
	goToNextPage(() => focusOnListItem(ref, index));
}

function focusOnPreviousPage(ref: HTMLElement, { index }, goToPreviousPage: () => void) {
	goToPreviousPage(() => focusOnListItem(ref, index));
}

type WithDynamicListGestureProps = {
	className: string;
	goToPreviousPage: () => void;
	goToNextPage: () => void;
	children: (fn: () => void) => React.Element;
};

export default class WithDynamicListGesture extends React.Component<WithDynamicListGestureProps> {
	myRef = React.createRef<HTMLDivElement>();

	constructor(props) {
		super(props);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	onKeyDown(event: KeyboardEvent, options) {
		switch (event.keyCode) {
			case keycode.codes.up:
				event.preventDefault();
				event.stopPropagation();
				if (this.myRef?.current) {
					focusOnPreviousItem(this.myRef.current, options, this.props.goToPreviousPage);
				}
				break;
			case keycode.codes.down:
				event.preventDefault();
				event.stopPropagation();
				if (this.myRef?.current) {
					focusOnNextItem(this.myRef.current, options, this.props.goToNextPage);
				}
				break;
			case keycode.codes['page up']:
				event.preventDefault();
				event.stopPropagation();
				if (this.myRef?.current) {
					focusOnNextPage(this.myRef.current, options, this.props.goToPreviousPage);
				}
				break;
			case keycode.codes['page down']:
				event.preventDefault();
				event.stopPropagation();
				if (this.myRef?.current) {
					focusOnPreviousPage(this.myRef.current, options, this.props.goToNextPage);
				}
				break;

			default:
				break;
		}
	}

	render() {
		return (
			<div ref={this.myRef} className={this.props.className}>
				{this.props.children(this.onKeyDown)}
			</div>
		);
	}
}
