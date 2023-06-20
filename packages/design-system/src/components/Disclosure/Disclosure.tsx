import { cloneElement, useState } from 'react';

type DisclosureProps = {
	children: React.ReactNode;
	initialValue?: boolean;
	eventType: string;
	show: boolean;
	setShow: (isOpen: boolean) => void;
};

type DisclosureOutputProps = {
	onClick?: () => void;
	onHover?: () => void;
	onLeave?: () => void;
};

export function Disclosure({
	children,
	show,
	setShow,
	eventType = 'click',
	...rest
}: DisclosureProps) {
	const toggle = () => setShow(!show);
	const props: DisclosureOutputProps = {};
	if (eventType === 'click') {
		props.onClick = () => {
			toggle();
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
	return cloneElement(children as any, { ...props, ...rest });
}
