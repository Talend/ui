import React from 'react';
import { isElement } from 'react-is';
import { StackHorizontal } from '../../Stack';

import styles from './Buttons.module.scss';

type ButtonsProps = React.HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean;
	readOnly?: boolean;
};

const Buttons = React.forwardRef(
	({ disabled, readOnly, children, ...rest }: ButtonsProps, ref: React.Ref<HTMLDivElement>) => {
		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		return (
			<div className={styles.buttons}>
				<StackHorizontal
					gap="M"
					justify="spaceBetween"
					padding={{ x: 0, y: 'M' }}
					{...rest}
					ref={ref}
				>
					{React.Children.toArray(children).map(child =>
						isElement(child) ? React.cloneElement(child, childrenProps) : child,
					)}
				</StackHorizontal>
			</div>
		);
	},
);

export default Buttons;
