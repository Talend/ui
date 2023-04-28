import { Component, createRef } from 'react';
import keycode from 'keycode';
import { focusOn, WithFocus } from './focus';

function getAllItems(ref: HTMLElement): NodeListOf<HTMLButtonElement> {
	return ref.querySelectorAll('li > button');
}

function focusOnListItem(ref: HTMLElement, index: number) {
	const listItem = getAllItems(ref)[index] as WithFocus;
	focusOn(listItem);
}

export type FocusOnOption = {
	index: number;
	size?: number;
};

function focusOnPreviousItem(
	ref: HTMLElement,
	{ index, size }: FocusOnOption,
	goToPreviousPage: (fn?: () => void) => void,
) {
	const nextIndex = index - 1;
	if (nextIndex < 0 && size) {
		goToPreviousPage(() => {
			focusOnListItem(ref, size - 1);
		});
	}
	focusOnListItem(ref, nextIndex);
}

function focusOnNextItem(
	ref: HTMLElement,
	{ index, size }: FocusOnOption,
	goToNextPage: (fn?: () => void) => void,
) {
	const nextIndex = index + 1;
	if (size && nextIndex >= size) {
		goToNextPage(() => {
			focusOnListItem(ref, 0);
		});
	}
	focusOnListItem(ref, nextIndex);
}

function focusOnNextPage(
	ref: HTMLElement,
	{ index }: FocusOnOption,
	goToNextPage: (fn?: () => void) => void,
) {
	goToNextPage(() => focusOnListItem(ref, index));
}

function focusOnPreviousPage(
	ref: HTMLElement,
	{ index }: FocusOnOption,
	goToPreviousPage: (fn?: () => void) => void,
) {
	goToPreviousPage(() => focusOnListItem(ref, index));
}

export interface WithDynamicListGestureProps {
	className: string;
	goToPreviousPage: () => void;
	goToNextPage: () => void;
	children: (fn: (event: KeyboardEvent, options: FocusOnOption) => void) => JSX.Element;
}

export class WithDynamicListGesture extends Component<WithDynamicListGestureProps> {
	myRef = createRef<HTMLDivElement>();

	constructor(props: WithDynamicListGestureProps) {
		super(props);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	onKeyDown(event: KeyboardEvent, options: FocusOnOption) {
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
