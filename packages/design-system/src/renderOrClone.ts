import { cloneElement, isValidElement, type ReactNode } from 'react';

export type ChildrenOrFn = ReactNode | ((props: any) => ReactNode);

export function renderOrClone(children: ChildrenOrFn, props: any = {}): ReactNode {
	if (typeof children === 'function') {
		return children(props);
	}

	if (isValidElement(children) && props) {
		return cloneElement(children, props);
	}

	return children;
}
