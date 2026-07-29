import { focusOn } from './focus';

function getAllItems(ref: HTMLElement): HTMLElement[] {
	const closest = ref.closest<HTMLElement>('[role="list"]');
	if (!closest) {
		return [];
	}
	return Array.from(closest.querySelectorAll<HTMLElement>('[role="listitem"]'));
}

function getNextItem(ref: HTMLElement, loop: boolean): HTMLElement | null {
	let nextElement: HTMLElement | null = null;
	let currentFound = false;
	let hasNext = false;

	const nodes = getAllItems(ref);
	const iterator = nodes.values();

	if (loop && ref === nodes[nodes.length - 1]) {
		return nodes[0] ?? null;
	}

	do {
		const { value, done } = iterator.next();

		if (currentFound) {
			nextElement = value ?? null;
			hasNext = false;
		} else {
			currentFound = value === ref;
			hasNext = !done;
		}
	} while (hasNext);

	return nextElement;
}

function getPreviousItem(ref: HTMLElement, loop: boolean): HTMLElement | null {
	let previousElement: HTMLElement | null = null;
	let hasNext = false;

	const nodes = getAllItems(ref);
	const iterator = nodes.values();

	if (loop && ref === nodes[0]) {
		return nodes[nodes.length - 1] ?? null;
	}

	do {
		const { value, done } = iterator.next();
		const currentFound = value === ref;

		if (currentFound) {
			hasNext = false;
		} else {
			previousElement = value ?? null;
			hasNext = !done;
		}
	} while (hasNext);

	return previousElement;
}

function onKeyDown(event: KeyboardEvent, ref: HTMLElement, loop: boolean) {
	switch (event.key) {
		case 'Down':
		case 'ArrowDown':
			event.stopPropagation();
			event.preventDefault();
			focusOn(getNextItem(ref, loop));
			break;
		case 'Up':
		case 'ArrowUp':
			event.stopPropagation();
			event.preventDefault();
			focusOn(getPreviousItem(ref, loop));
			break;
		default:
			break;
	}
}

export function withListGesture<T>(WrappedComponent: React.ComponentType<T>, loop = false) {
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
