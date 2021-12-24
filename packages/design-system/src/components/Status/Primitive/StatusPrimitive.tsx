import React from 'react';
import classnames from 'classnames';
import { IconName } from '@talend/icons';
import Tooltip from '../../Tooltip';
import { Icon } from '../../Icon/Icon';
import Loading from '../../Loading';
import { StackHorizontal } from '../../Stack';

import styles from './Status.module.scss';

export const variants = ['successful', 'failed', 'inProgress', 'warning', 'canceled'] as const;

export type StatusProps = {
	icon?: IconName;
	inProgress?: boolean;
	hideText?: boolean;
	children?: string;
	variant: typeof variants[number];
};

const Status = React.forwardRef(
	(
		{ children, icon, inProgress, hideText, variant, ...rest }: StatusProps,
		ref: React.Ref<HTMLSpanElement>,
	) => {
		const text = <span className={styles.status__text}>{children}</span>;
		const picto = (
			<span className={styles.status__icon} aria-hidden>
				{!inProgress && icon && <Icon name={icon} />}
				{inProgress && <Loading />}
			</span>
		);

		return (
			<span {...rest} className={classnames(styles.status, styles[variant])} ref={ref}>
				<StackHorizontal as="span" display="inline" gap="XXS" align="center" justify="start">
					{hideText ? <Tooltip title={children}>{picto}</Tooltip> : [picto, text]}
				</StackHorizontal>
			</span>
		);
	},
);

export default Status;
