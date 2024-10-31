import { forwardRef, Ref } from 'react';

import classnames from 'classnames';

import { DataAttributes } from '../../../types';

import styles from './StatusBubblePrimitive.module.scss';

export const variants = {
	beta: 'beta',
	error: 'error',
	information: 'information',
	success: 'success',
	warning: 'warning',
};

export type StatusDotProps = {
	variant: string;
	className?: string;
} & DataAttributes;

const StatusDotPrimitive = forwardRef(
	({ variant, className, ...rest }: StatusDotProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<span
				className={classnames(styles.statusDot, styles[variant], className)}
				ref={ref}
				{...rest}
			/>
		);
	},
);

StatusDotPrimitive.displayName = 'StatusDotPrimitive';

export default StatusDotPrimitive;
