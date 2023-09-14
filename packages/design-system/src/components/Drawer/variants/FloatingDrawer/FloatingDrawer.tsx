import { useEffect, useState, cloneElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { PrimitiveDrawer } from '../../Primitive/PrimitiveDrawer';

import theme from './FloatingDrawer.module.scss';
import { useId } from '../../../../useId';

type WithDisclosure = {
	disclosure: ReactElement;
	visible?: never;
};
type Controlled = {
	disclosure?: never;
	visible: boolean;
};

type DialogFnProps = {
	onClose: () => void;
};

export type FloatingDrawerProps = {
	header?: ((dialog: DialogFnProps) => ReactNode) | ReactNode;
	children: ((dialog: DialogFnProps) => ReactNode) | ReactNode;
	footer?: ((dialog: DialogFnProps) => ReactNode) | ReactNode;
	onClose?: () => void;
} & (WithDisclosure | Controlled);

// backward compatibility
export type DrawerProps = FloatingDrawerProps;

export const FloatingDrawer = ({
	id,
	disclosure,
	header,
	children,
	footer,
	visible,
	onClose,
}: DrawerProps) => {
	const uuid = useId(id, 'drawer');
	const [isVisible, setVisible] = useState(visible === undefined ? false : visible);
	// sync with the props
	useEffect(() => {
		if (visible !== undefined && visible !== isVisible) {
			setVisible(visible);
		}
	}, [visible, isVisible]);
	const onCloseHandler = () => {
		if (onClose) {
			onClose();
		} else {
			setVisible(false);
		}
	};

	const disclosureProps = {
		onClick: () => setVisible(!isVisible),
		['aria-expanded']: isVisible,
		['aria-controls']: uuid,
	};
	return (
		<>
			{disclosure && <div>{cloneElement(disclosure, disclosureProps)}</div>}
			{isVisible && (
				<div data-test="drawer" id={uuid} role="dialog" className={theme.drawer}>
					<PrimitiveDrawer
						header={typeof header === 'function' ? header({ onClose: onCloseHandler }) : header}
						footer={typeof footer === 'function' ? footer({ onClose: onCloseHandler }) : footer}
					>
						{typeof children === 'function' ? children({ onClose: onCloseHandler }) : children}
					</PrimitiveDrawer>
				</div>
			)}
		</>
	);
};

FloatingDrawer.displayName = 'FloatingDrawer';
