import React, { useEffect, useRef } from 'react';
import { Dialog, DialogDisclosure, useDialogState } from 'reakit';
import { useSpring, animated } from 'react-spring';
import Drawer from '../../Primitive/Drawer';

import theme from './FloatingDrawer.scss';

export type DrawerProps = {
	disclosure?: React.ReactElement;
	header?: React.ReactNode;
	children: React.ReactNode;
	footer?: React.ReactNode;
	visible?: boolean;
	onClose?: () => void;
};

// eslint-disable-next-line react/display-name
export const FloatingDrawer = ({
	disclosure,
	header,
	children,
	footer,
	visible: visibleProps,
	onClose,
}: DrawerProps) => {
	const ref = useRef(null);
	const dialog = useDialogState({ modal: false, visible: visibleProps ?? false, animated: true });
	const { transform } = useSpring({
		transform: dialog.visible ? 'translateX(0%)' : 'translateX(100%)',
		onRest: dialog.stopAnimation,
	});

	useEffect(() => {
		if (visibleProps !== undefined) {
			dialog.setVisible(visibleProps);
		}
	}, [visibleProps, dialog]);

	const onCloseHandler = disclosure ? () => dialog.setVisible(false) : () => onClose && onClose();

	return (
		<>
			{disclosure && (
				<DialogDisclosure {...dialog}>
					{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
				</DialogDisclosure>
			)}
			<Dialog
				{...dialog}
				data-test="drawer"
				ref={ref}
				hideOnClickOutside={false}
				hide={onCloseHandler}
				as={animated.div}
				className={theme['floating-drawer']}
				style={{ transform }}
			>
				<Drawer
					header={typeof header === 'function' ? header(dialog) : header}
					footer={typeof footer === 'function' ? footer(dialog) : footer}
				>
					{typeof children === 'function' ? children(dialog) : children}
				</Drawer>
			</Dialog>
		</>
	);
};

export default Drawer;
