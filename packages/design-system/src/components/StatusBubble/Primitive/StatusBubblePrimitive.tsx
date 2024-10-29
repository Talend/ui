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

export type StatusBubbleProps = {
	variant: string;
} & DataAttributes;

const StatusBubblePrimitive = forwardRef(
	({ variant, ...rest }: StatusBubbleProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<span className={classnames(styles.statusBubble, styles[variant])} ref={ref} {...rest} />
		);
	},
);

StatusBubblePrimitive.displayName = 'StatusBubblePrimitive';

export default StatusBubblePrimitive;
