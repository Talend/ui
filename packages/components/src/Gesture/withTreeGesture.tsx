import * as React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import omit from 'lodash/omit';
import { focusOn } from './focus';

function getAllItems(ref: HTMLElement) {
	const nodes = ref.closest('ul[role="tree"]');
	if (nodes) {
		return nodes.querySelectorAll('li[role="treeitem"]');
	}
	return null;
}

function getFirstItem(ref: HTMLElement): HTMLElement | null {
	const nodes = ref.closest('ul[role="tree"]');
	if (nodes) {
		return nodes.querySelector('li[role="treeitem"]');
	}
	return null;
}

function getLastItem(ref: HTMLElement): HTMLElement | null {
	const nodes = getAllItems(ref);
	if (nodes && nodes.length > 0) {
		return nodes.item(nodes.length - 1) as HTMLElement;
	}
	return null;
}

function getParentItem(ref: HTMLElement): HTMLElement | null {
	const parentElement = ref.parentElement;
	if (parentElement) {
		return parentElement.closest('li[role="treeitem"]');
	}
	return null;
}

function getFirstChildItem(ref: HTMLElement): HTMLElement | null {
	return ref.querySelector('li[role="treeitem"]');
}

function getNextItem(ref: HTMLElement): HTMLElement | null {
	let nextElement = null;
	let currentFound;
	let hasNext;

	const nodes = getAllItems(ref)?.values();
	if (!nodes) {
		return nextElement;
	}

	do {
		const { value, done } = nodes.next();

		if (currentFound) {
			nextElement = value;
			hasNext = false;
		} else {
			currentFound = value === ref;
			hasNext = !done;
		}
	} while (hasNext);

	return nextElement;
}

function getPreviousItem(ref: HTMLElement) {
	let previousElement = null;
	let hasNext;

	const nodes = getAllItems(ref)?.values();
	if (!nodes) {
		return previousElement;
	}

	do {
		const { value, done } = nodes.next();
		const currentFound = value === ref;

		if (currentFound) {
			hasNext = false;
		} else {
			previousElement = value;
			hasNext = !done;
		}
	} while (hasNext);

	return previousElement;
}

interface GestureProps {
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, ref: any, item: any) => void;
	onSelect: (e: React.KeyboardEvent<HTMLInputElement>, item: any) => void;
	onToggle: (e: React.KeyboardEvent<HTMLInputElement>, item: any) => void;
	onToggleAllSiblings: (e: React.KeyboardEvent<HTMLInputElement>, siblings: any) => void;
}

export default function withTreeGesture<T extends GestureProps = GestureProps>(
	WrappedComponent: React.ComponentType<T>,
) {
	return class TreeGesture extends React.Component<T> {
		static displayName = `TreeGesture(${WrappedComponent.displayName})`;

		constructor(props: T) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
		}

		onKeyDown(event: React.KeyboardEvent<HTMLInputElement>, ref: any, item: any) {
			const { hasChildren, isOpened, siblings } = item;
			switch (event.keyCode) {
				case keycode.codes.enter:
				case keycode.codes.space:
					event.stopPropagation();
					this.props.onSelect(event, item);
					break;
				case keycode.codes.left:
					if (hasChildren && isOpened) {
						event.stopPropagation();
						this.props.onToggle(event, item);
					} else if (!hasChildren || !isOpened) {
						event.stopPropagation();
						focusOn(getParentItem(ref));
					}
					break;
				case keycode.codes.right:
					if (hasChildren && !isOpened) {
						event.stopPropagation();
						this.props.onToggle(event, item);
					} else if (hasChildren && isOpened) {
						event.stopPropagation();
						focusOn(getFirstChildItem(ref));
					}
					break;
				case keycode.codes.down:
					event.stopPropagation();
					focusOn(getNextItem(ref));
					break;
				case keycode.codes.up:
					event.stopPropagation();
					focusOn(getPreviousItem(ref));
					break;
				case keycode.codes.home:
					event.stopPropagation();
					focusOn(getFirstItem(ref));
					break;
				case keycode.codes.end:
					event.stopPropagation();
					focusOn(getLastItem(ref));
					break;
				default:
					break;
			}
			if (event.nativeEvent.key === '*') {
				event.stopPropagation();
				this.props.onToggleAllSiblings(event, siblings);
			}
		}

		render() {
			const props = { ...(this.props as T) };
			props.onKeyDown = this.onKeyDown;
			return <WrappedComponent {...props} />;
		}
	};
}
