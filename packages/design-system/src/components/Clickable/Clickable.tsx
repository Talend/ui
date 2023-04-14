import { forwardRef, MouseEvent, ReactNode, Ref } from 'react';
import classnames from 'classnames';
import {
	Clickable as ReakitClickable,
	ClickableProps as ReakitClickableProps,
} from 'reakit/Clickable';

import styles from './Clickable.module.scss';

export type ClickableProps = Omit<ReakitClickableProps, 'style'> & {
	type?: 'button' | 'submit' | 'reset';
	children: ReactNode | ReactNode[];
	onClick?: (event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};

const Clickable = forwardRef(
	// Ref<any>: Clickable is polymorphic. Could be any HTML element
	({ type = 'button', className, ...props }: ClickableProps, ref: Ref<any>) => {
		return (
			<ReakitClickable
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
