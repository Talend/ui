import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import omit from 'lodash/omit';

function focusOn(event, element) {
	if (element) {
		element.focus();
	}
}

function getAllItems(ref) {
	return ref.closest('ul[role="tree"]').querySelectorAll('li[role="treeitem"]');
}

function getFirstItem(ref) {
	return ref.closest('ul[role="tree"]').querySelector('li[role="treeitem"]');
}

function getLastItem(ref) {
	const nodes = getAllItems(ref);
	return nodes.item(nodes.length - 1);
}

function getParentItem(ref) {
	return ref.parentElement.closest('li[role="treeitem"]');
}

function getFirstChildItem(ref) {
	return ref.querySelector('li[role="treeitem"]');
}

function getNextItem(ref) {
	let nextElement;
	let currentFound;
	let hasNext;

	const nodes = getAllItems(ref).values();

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
	let previousElement;
	let hasNext;

	const nodes = getAllItems(ref).values();

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

export default function withTreeGesture(WrappedComponent) {
	class TreeGesture extends React.Component {
		constructor(props) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
		}

		onKeyDown(event, ref, item) {
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
						focusOn(event, getParentItem(ref));
					}
					break;
				case keycode.codes.right:
					if (hasChildren && !isOpened) {
						event.stopPropagation();
						this.props.onToggle(event, item);
					} else if (hasChildren && isOpened) {
						event.stopPropagation();
						focusOn(event, getFirstChildItem(ref));
					}
					break;
				case keycode.codes.down:
					event.stopPropagation();
					focusOn(event, getNextItem(ref));
					break;
				case keycode.codes.up:
					event.stopPropagation();
					focusOn(event, getPreviousItem(ref));
					break;
				case keycode.codes.home:
					event.stopPropagation();
					focusOn(event, getFirstItem(ref));
					break;
				case keycode.codes.end:
					event.stopPropagation();
					focusOn(event, getLastItem(ref));
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
			return <WrappedComponent {...this.props} onKeyDown={this.onKeyDown} />;
		}
	}

	TreeGesture.propTypes = {
		...omit(WrappedComponent.propTypes, 'onKeyDown'),
		onSelect: PropTypes.func.isRequired,
		onToggle: PropTypes.func.isRequired,
		onToggleAllSiblings: PropTypes.func.isRequired,
	};
	TreeGesture.displayName = `TreeGesture(${WrappedComponent.displayName})`;

	return TreeGesture;
}
