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

function getNextItem(ref, loop) {
	let nextElement;
	let currentFound;
	let hasNext;

	const nodes = getAllItems(ref);
	const iterator = nodes.values();

	if (loop && ref === nodes.item(nodes.length - 1)) {
		return nodes.item(0);
	}

	do {
		const { value, done } = iterator.next();

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

function getPreviousItem(ref, loop) {
	let previousElement;
	let hasNext;

	const nodes = getAllItems(ref);
	const iterator = nodes.values();

	if (loop && ref === nodes.item(0)) {
		return nodes.item(nodes.length - 1);
	}

	do {
		const { value, done } = iterator.next();
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

function onKeyDown(event, ref, loop) {
	switch (event.keyCode) {
		case keycode.codes.down:
			event.stopPropagation();
			event.preventDefault();
			focusOn(event, getNextItem(ref, loop));
			break;
		case keycode.codes.up:
			event.stopPropagation();
			event.preventDefault();
			focusOn(event, getPreviousItem(ref, loop));
			break;
		default:
			break;
	}
}

export default function withListGesture(WrappedComponent, loop = false) {
	function ListGesture(props) {
		return <WrappedComponent {...props} onKeyDown={(...args) => onKeyDown(...args, loop)} />;
	}

	ListGesture.displayName = `ListGesture(${WrappedComponent.displayName})`;

	return ListGesture;
}
