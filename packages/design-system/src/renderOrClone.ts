import type { ReactNode } from 'react';

export type ChildrenOrFn = ReactNode | ((props: any) => ReactNode);

export function renderOrClone(children: ChildrenOrFn, props: any = {}): ReactNode {
	if (typeof children === 'function') {
		return children(props);
	}
	return children && props ? React.cloneElement(children, props) : children;
}
