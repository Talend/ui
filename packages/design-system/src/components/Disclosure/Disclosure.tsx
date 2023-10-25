import type { Ref } from 'react';

import { ChildOrGenerator, renderOrClone } from '../../renderOrClone';

export type DisclosureProps = {
	children: ChildOrGenerator<JSX.Element, DisclosureFnProps>;
	popref?: Ref<HTMLButtonElement>;
};

type DisclosureButtonProps = {
	ref?: Ref<HTMLButtonElement>;
};

export type DisclosureFnProps = {
	ref?: Ref<HTMLButtonElement>;
};

export function Disclosure({ children, popref, ...rest }: DisclosureProps) {
	const props: DisclosureButtonProps = {
		ref: popref,
	};

	return renderOrClone(children, { ...props, ...rest }) || null;
}
