import React from 'react';
import keycode from 'keycode';
import { focusOn } from './focus';

function getAllItems(ref: HTMLElement) {
	const closest = ref.closest('[role="list"]');
	if (!closest) {
		return [];
	}
	return closest.querySelectorAll('[role="listitem"]');
}

function getNextItem(ref: HTMLElement, loop: boolean) {
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

function getPreviousItem(ref: HTMLElement, loop: boolean) {
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

function onKeyDown(event: KeyboardEvent, ref: HTMLElement, loop: boolean) {
	switch (event.keyCode) {
		case keycode.codes.down:
			event.stopPropagation();
			event.preventDefault();
			focusOn(getNextItem(ref, loop));
			break;
		case keycode.codes.up:
			event.stopPropagation();
			event.preventDefault();
			focusOn(getPreviousItem(ref, loop));
			break;
		default:
			break;
	}
}

export default function withListGesture<T>(WrappedComponent: React.ComponentType<T>, loop = false) {
	function ListGesture(props: T) {
		return (
			<WrappedComponent
				{...props}
				onKeyDown={(event: KeyboardEvent, ref: HTMLElement) => onKeyDown(event, ref, loop)}
			/>
		);
	}

	ListGesture.displayName = `ListGesture(${WrappedComponent.displayName})`;

	return ListGesture;
}
