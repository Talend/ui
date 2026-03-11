import { jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import { focusOn } from './focus';
function getAllItems(ref) {
	const nodes = ref.closest('ul[role="tree"]');
	if (nodes) {
		return nodes.querySelectorAll('li[role="treeitem"]');
	}
	return null;
}
function getFirstItem(ref) {
	const nodes = ref.closest('ul[role="tree"]');
	if (nodes) {
		return nodes.querySelector('li[role="treeitem"]');
	}
	return null;
}
function getLastItem(ref) {
	const nodes = getAllItems(ref);
	if (nodes && nodes.length > 0) {
		return nodes.item(nodes.length - 1);
	}
	return null;
}
function getParentItem(ref) {
	const parentElement = ref.parentElement;
	if (parentElement) {
		return parentElement.closest('li[role="treeitem"]');
	}
	return null;
}
function getFirstChildItem(ref) {
	return ref.querySelector('li[role="treeitem"]');
}
function getNextItem(ref) {
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
function getPreviousItem(ref) {
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
function withTreeGesture(WrappedComponent) {
	var _a;
	return (
		(_a = class extends Component {
			constructor(props) {
				super(props);
				this.onKeyDown = this.onKeyDown.bind(this);
			}
			onKeyDown(event, ref, item) {
				const { hasChildren, isOpened, siblings } = item;
				switch (event.key) {
					case 'Enter':
					case ' ':
					case 'Spacebar':
						event.stopPropagation();
						this.props.onSelect(event, item);
						break;
					case 'Left':
					case 'ArrowLeft':
						if (hasChildren && isOpened) {
							event.stopPropagation();
							this.props.onToggle(event, item);
						} else if (!hasChildren || !isOpened) {
							event.stopPropagation();
							focusOn(getParentItem(ref));
						}
						break;
					case 'Right':
					case 'ArrowRight':
						if (hasChildren && !isOpened) {
							event.stopPropagation();
							this.props.onToggle(event, item);
						} else if (hasChildren && isOpened) {
							event.stopPropagation();
							focusOn(getFirstChildItem(ref));
						}
						break;
					case 'Down':
					case 'ArrowDown':
						event.stopPropagation();
						focusOn(getNextItem(ref));
						break;
					case 'Up':
					case 'ArrowUp':
						event.stopPropagation();
						focusOn(getPreviousItem(ref));
						break;
					case 'Home':
						event.stopPropagation();
						focusOn(getFirstItem(ref));
						break;
					case 'End':
						event.stopPropagation();
						focusOn(getLastItem(ref));
						break;
					default:
						break;
				}
				if (event.nativeEvent.key === '*' || event.nativeEvent.key === 'Multiply') {
					event.stopPropagation();
					this.props.onToggleAllSiblings(event, siblings);
				}
			}
			render() {
				const props = { ...this.props };
				props.onKeyDown = this.onKeyDown;
				return /* @__PURE__ */ jsx(WrappedComponent, { ...props });
			}
		}),
		(_a.displayName = `TreeGesture(${WrappedComponent.displayName})`),
		_a
	);
}
export { withTreeGesture };
//# sourceMappingURL=withTreeGesture.js.map
