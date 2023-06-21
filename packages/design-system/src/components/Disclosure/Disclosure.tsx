import { cloneElement } from 'react';
import type { Ref } from 'react';

export type DisclosureProps = {
	children: React.ReactNode;
	initialValue?: boolean;
	eventType: string;
	open: boolean;
	popref: Ref;
	setOpen: (isOpen: boolean) => void;
};

type DisclosureButtonProps = {
	ref: Ref;
	onClick?: () => void;
	onHover?: () => void;
	onLeave?: () => void;
};

export type DisclosureFnProps = {
	ref;
	open: boolean;
	toggle: () => void;
	hide: () => void;
	setOpen: (isOpen: boolean) => void;
};

export function Disclosure({
	children,
	popref,
	open,
	setOpen,
	eventType = 'click',
	...rest
}: DisclosureProps) {
	const props: DisclosureButtonProps = {
		ref: popref,
	};
	if (eventType === 'click') {
		props.onClick = (...args: any) => {
			setOpen(!open);
			if (rest.onClick) rest.onClick(...args);
		};
	} else {
		props.onHover = () => {
			setIsOpen(true);
		};
		props.onLeave = () => {
			setIsOpen(false);
		};
	}
	if (typeof children === 'function') {
		return children({
			ref: popref,
			open,
			setOpen,
		});
	}
	if (!children) {
		return null;
	}
	return cloneElement(children as any, { ...props, ...rest });
}
