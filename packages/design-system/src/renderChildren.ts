import { ReactNode } from 'react';

import { ChildOrGenerator, renderOrClone } from './renderOrClone';

/**
 * Type guard to check if element is iterable or not
 * @param element element to check
 * @returns true if iterable ; false otherwise
 */
function areChildrenIterable<T>(element: T | Iterable<T>): element is Iterable<T> {
	return typeof element === 'object' && Symbol.iterator in (element as Iterable<T>);
}

export function renderChildren<T extends ReactNode, P, R = unknown>(
	children: ChildOrGenerator<T, P, R> | Iterable<ChildOrGenerator<T, P, R>>,
	props: P,
	ref?: R,
) {
	return areChildrenIterable(children)
		? Array.from(children).map(child => renderOrClone(child, props, ref))
		: renderOrClone(children, props, ref);
}
