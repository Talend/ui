import { useEffect, useRef, cloneElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { PrimitiveDrawer } from '../../Primitive/PrimitiveDrawer';

import theme from './FloatingDrawer.module.scss';

type WithDisclosure = {
	disclosure: ReactElement;
	visible?: never;
};
type Controlled = {
	disclosure?: never;
	visible: boolean;
};

export type FloatingDrawerProps = {
	header?: ((dialog: any) => ReactNode) | ReactNode;
	children: ((dialog: any) => ReactNode) | ReactNode;
	footer?: ((dialog: any) => ReactNode) | ReactNode;
	onClose?: () => void;
} & (WithDisclosure | Controlled);

// backward compatibility
export type DrawerProps = FloatingDrawerProps;

export const FloatingDrawer = ({
	disclosure,
	header,
	children,
	footer,
	visible: visibleProps,
	onClose,
}: DrawerProps) => {
	const ref = useRef(null);
	// const dialog = useDialogState({ modal: false, visible: visibleProps ?? false, animated: true });

	useEffect(() => {
		if (visibleProps !== undefined) {
			// dialog.setVisible(visibleProps);
		}
	}, [visibleProps]);

	const onCloseHandler = () => onClose && onClose();

	return (
		<>
			{disclosure && <div>{disclosureProps => cloneElement(disclosure, disclosureProps)}</div>}
			<div
				data-test="drawer"
				ref={ref}
				hideOnClickOutside={false}
				hide={onCloseHandler}
				className={theme['floating-drawer']}
			>
				<PrimitiveDrawer
					header={typeof header === 'function' ? header({}) : header}
					footer={typeof footer === 'function' ? footer({}) : footer}
				>
					{typeof children === 'function' ? children({}) : children}
				</PrimitiveDrawer>
			</div>
		</>
	);
};

FloatingDrawer.displayName = 'FloatingDrawer';
