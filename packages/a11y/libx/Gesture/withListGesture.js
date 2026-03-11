import { jsx } from 'react/jsx-runtime';
import { focusOn } from './focus';
function getAllItems(ref) {
	const closest = ref.closest('[role="list"]');
	if (!closest) {
		return new NodeList();
	}
	return closest.querySelectorAll('[role="listitem"]');
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
function withListGesture(WrappedComponent, loop = false) {
	function ListGesture(props) {
		return /* @__PURE__ */ jsx(WrappedComponent, {
			...props,
			onKeyDown: (event, ref) => onKeyDown(event, ref, loop),
		});
	}
	ListGesture.displayName = `ListGesture(${WrappedComponent.displayName})`;
	return ListGesture;
}
export { withListGesture };
//# sourceMappingURL=withListGesture.js.map
