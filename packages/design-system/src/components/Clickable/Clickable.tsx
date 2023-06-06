import { forwardRef, MouseEvent, ReactNode, Ref, HTMLProps } from 'react';
import classnames from 'classnames';

import styles from './Clickable.module.scss';

export type ClickableProps = Omit<HTMLProps<HTMLButtonElement>, 'size' | 'ref'> & {
	type?: 'button' | 'submit' | 'reset';
	children: string | ReactNode | ReactNode[];
	onClick?: (event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};

const Clickable = forwardRef(
	// Ref<any>: Clickable is polymorphic. Could be any HTML element
	({ type = 'button', className, ...props }: ClickableProps, ref: Ref<any>) => {
		return (
			<button
				{...props}
				className={classnames(styles.clickable, className)}
				type={type}
				ref={ref}
			/>
		);
	},
);
Clickable.displayName = 'Clickable';
export default Clickable;
