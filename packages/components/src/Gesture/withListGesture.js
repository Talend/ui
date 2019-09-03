import React from 'react';
import keycode from 'keycode';

function focusOn(event, element) {
	if (element) {
		element.focus();
	}
}

function getAllItems(ref) {
	return ref.closest('[role="list"]').querySelectorAll('[role="listitem"]');
}

function getNextItem(ref) {
	let nextElement;
	let currentFound;
	let hasNext;

	const nodes = getAllItems(ref);
	const iterator = nodes.values();

	do {
		const { value, done } = iterator.next();

		if (currentFound) {
			nextElement = value;
			hasNext = false;
			if (done && !nextElement) {
				nextElement = nodes.item(0);
			}
		} else {
			currentFound = value === ref;
			hasNext = !done;
		}
	} while (hasNext);

	return nextElement;
}

function getPreviousItem(ref) {
	let previousElement;
	let hasNext;

	const nodes = getAllItems(ref);
	const iterator = nodes.values();

	do {
		const { value, done } = iterator.next();
		const currentFound = value === ref;

		if (currentFound) {
			hasNext = false;
			if (!previousElement) {
				previousElement = nodes.item(nodes.length - 1);
			}
		} else {
			previousElement = value;
			hasNext = !done;
		}
	} while (hasNext);

	return previousElement;
}

function onKeyDown(event, ref) {
	switch (event.keyCode) {
		case keycode.codes.down:
			event.stopPropagation();
			event.preventDefault();
			focusOn(event, getNextItem(ref));
			break;
		case keycode.codes.up:
			event.stopPropagation();
			event.preventDefault();
			focusOn(event, getPreviousItem(ref));
			break;
		default:
			break;
	}
}

export default function withListGesture(WrappedComponent) {
	function ListGesture(props) {
		return <WrappedComponent {...props} onKeyDown={onKeyDown} />;
	}

	ListGesture.displayName = `ListGesture(${WrappedComponent.displayName})`;

	return ListGesture;
}
