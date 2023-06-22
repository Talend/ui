import { cloneElement } from 'react';
import type { Ref, ReactNode } from 'react';

export type DisclosureProps = {
	children: ReactNode | ((props: DisclosureFnProps) => ReactNode);
	popref: Ref<HTMLButtonElement>;
};

type DisclosureButtonProps = {
	ref: Ref<HTMLButtonElement>;
};

export type DisclosureFnProps = {
	ref: Ref<HTMLButtonElement>;
};

export function Disclosure({ children, popref, ...rest }: DisclosureProps) {
	const props: DisclosureButtonProps = {
		ref: popref,
	};
	if (typeof children === 'function') {
		return children({
			ref: popref,
			...rest,
		});
	}
	if (!children) {
		return null;
	}
	return cloneElement(children as any, { ...props, ...rest });
}
