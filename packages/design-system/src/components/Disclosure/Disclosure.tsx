import { cloneElement } from 'react';
import type { Ref } from 'react';

type DisclosureProps = {
	children: React.ReactNode;
	initialValue?: boolean;
	eventType: string;
	open: boolean;
	popref: Ref;
	setOpen: (isOpen: boolean) => void;
};

type DisclosureOutputProps = {
	onClick?: () => void;
	onHover?: () => void;
	onLeave?: () => void;
};

export function Disclosure({
	children,
	popref,
	open,
	setOpen,
	eventType = 'click',
	...rest
}: DisclosureProps) {
	const props: DisclosureOutputProps = {
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
		return children(props);
	}
	if (!children) {
		return null;
	}
	return cloneElement(children as any, { ...props, ...rest });
}
