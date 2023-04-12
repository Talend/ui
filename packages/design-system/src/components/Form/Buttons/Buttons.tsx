import { forwardRef, Children, cloneElement } from 'react';
import type { HTMLAttributes, Ref } from 'react';
import { isElement } from 'react-is';
import { StackHorizontal } from '../../Stack';

import styles from './Buttons.module.scss';

type ButtonsProps = HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean;
	readOnly?: boolean;
};

const Buttons = forwardRef(
	({ disabled, readOnly, children, ...rest }: ButtonsProps, ref: Ref<HTMLDivElement>) => {
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
					{Children.toArray(children).map(child =>
						isElement(child) ? cloneElement(child, childrenProps) : child,
					)}
				</StackHorizontal>
			</div>
		);
	},
);

Buttons.displayName = 'Buttons';

export default Buttons;
