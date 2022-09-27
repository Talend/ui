import React, { useEffect, useRef } from 'react';
import { Dialog, DialogDisclosure, DialogStateReturn, useDialogState } from 'reakit';
import PrimitiveDrawer from '../../Primitive/PrimitiveDrawer';

import theme from './FloatingDrawer.module.scss';

type WithDisclosure = {
	disclosure: React.ReactElement;
	visible?: never;
};
type Controlled = {
	disclosure?: never;
	visible: boolean;
};

export type DrawerProps = {
	header?: ((dialog: DialogStateReturn) => React.ReactNode) | React.ReactNode;
	children: ((dialog: DialogStateReturn) => React.ReactNode) | React.ReactNode;
	footer?: ((dialog: DialogStateReturn) => React.ReactNode) | React.ReactNode;
	onClose?: () => void;
} & (WithDisclosure | Controlled);

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
				className={theme['floating-drawer']}
			>
				<PrimitiveDrawer
					header={typeof header === 'function' ? header(dialog) : header}
					footer={typeof footer === 'function' ? footer(dialog) : footer}
				>
					{typeof children === 'function' ? children(dialog) : children}
				</PrimitiveDrawer>
			</Dialog>
		</>
	);
};
