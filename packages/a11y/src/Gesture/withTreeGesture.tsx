/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent, ComponentType, Component } from 'react';
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

export type TreeGestureProps = {
	onSelect: (e: KeyboardEvent<HTMLElement>, item: any) => void;
	onToggle: (e: KeyboardEvent<HTMLElement>, item: any) => void;
	onToggleAllSiblings: (e: KeyboardEvent<HTMLElement>, siblings: any) => void;
};

export type WithTreeInjectedProps = TreeGestureProps & {
	onKeyDown: (e: KeyboardEvent<HTMLElement>, ref: any, item: any) => void;
};

export function withTreeGesture<T extends WithTreeInjectedProps>(
	WrappedComponent: ComponentType<T>,
) {
	type Props = Omit<WithTreeInjectedProps, 'onKeyDown'>;

	return class TreeGesture extends Component<Props> {
		static displayName = `TreeGesture(${WrappedComponent.displayName})`;

		constructor(props: Props) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
		}

		onKeyDown(event: KeyboardEvent<HTMLElement>, ref: any, item: any) {
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
			const props = { ...(this.props as any) };
			props.onKeyDown = this.onKeyDown;
			return <WrappedComponent {...props} />;
		}
	};
}
