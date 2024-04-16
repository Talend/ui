import { cloneElement, useEffect, useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Transition } from 'react-transition-group';

import { useId } from '../../../../useId';
import { PrimitiveDrawer } from '../../Primitive/PrimitiveDrawer';
import theme from './FloatingDrawer.module.css';

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
	id?: string;
	header?: ((dialog: DialogFnProps) => ReactNode) | ReactNode;
	children: ((dialog: DialogFnProps) => ReactNode) | ReactNode;
	footer?: ((dialog: DialogFnProps) => ReactNode) | ReactNode;
	withTransition?: boolean;
	onClose?: () => void;
	['aria-label']: string;
} & (WithDisclosure | Controlled);

// backward compatibility
export type DrawerProps = FloatingDrawerProps;

const STYLES = {
	entering: { transform: 'translateX(100%)' },
	entered: { transform: 'translateX(0%)' },
	exiting: { transform: 'translateX(100%)' },
	exited: { transform: 'translateX(100%)' },
	unmounted: { transform: 'translateX(100%)' },
};

export const FloatingDrawer = ({
	id,
	withTransition = true,
	disclosure,
	header,
	children,
	footer,
	visible,
	onClose,
	...props
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
				<Transition in appear timeout={withTransition ? 500 : 0}>
					{transitionState => {
						const style = {
							...STYLES[transitionState],
						};
						const childrenProps = {
							onClose: onCloseHandler,
						};
						return (
							<div
								data-test="drawer"
								data-testid="drawer"
								id={uuid}
								role="dialog"
								aria-label={props['aria-label']}
								className={theme.drawer}
								style={style}
							>
								<PrimitiveDrawer
									header={typeof header === 'function' ? header(childrenProps) : header}
									footer={typeof footer === 'function' ? footer(childrenProps) : footer}
								>
									{typeof children === 'function' ? children(childrenProps) : children}
								</PrimitiveDrawer>
							</div>
						);
					}}
				</Transition>
			)}
		</>
	);
};

FloatingDrawer.displayName = 'FloatingDrawer';

type ContainerPropTypes = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode | ReactNode[];
	style?: Omit<CSSProperties, 'overflowX' | 'position'>;
};

const Container = ({ children, style, ...props }: ContainerPropTypes) => (
	<div {...props} style={{ overflowX: 'hidden', position: 'relative', ...style }}>
		{children}
	</div>
);

Container.displayName = 'FloatingDrawer.Container';

FloatingDrawer.Container = Container;
