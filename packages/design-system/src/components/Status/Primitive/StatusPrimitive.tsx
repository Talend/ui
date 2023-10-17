import { forwardRef } from 'react';
import type { Ref } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { Tooltip, TooltipChildrenFnProps, TooltipChildrenFnRef } from '../../Tooltip';
import { Loading } from '../../Loading';
import { SizedIcon } from '../../Icon';
import { StackHorizontal } from '../../Stack';

import styles from './Status.module.scss';
import { mergeRefs } from '../../../mergeRef';

export const variants = {
	successful: 'successful',
	failed: 'failed',
	inProgress: 'inProgress',
	warning: 'warning',
	canceled: 'canceled',
};

export type StatusProps = {
	icon?: IconNameWithSize<'M'>;
	inProgress?: boolean;
	hideText?: boolean;
	children?: string;
	variant: keyof typeof variants;
};

const Status = forwardRef(
	(
		{ children, icon, inProgress, hideText, variant, ...rest }: StatusProps,
		ref: Ref<HTMLSpanElement>,
	) => {
		const text = (
			<span className={styles.status__text} key="text">
				{children}
			</span>
		);
		const picto = (
			<span className={styles.status__icon} key="picto">
				{inProgress ? <Loading /> : icon ? <SizedIcon name={icon} size="M" /> : null}
			</span>
		);

		return (
			<span {...rest} className={classnames(styles.status, styles[variant])} ref={ref}>
				<StackHorizontal as="span" display="inline" gap="XXS" align="center" justify="start">
					{hideText ? (
						<Tooltip title={children}>
							{(triggerProps: TooltipChildrenFnProps, triggerRef: TooltipChildrenFnRef) => (
								<span
									className={styles.status__icon}
									aria-hidden
									{...triggerProps}
									ref={mergeRefs([ref, triggerRef])}
								>
									{inProgress ? <Loading /> : icon ? <SizedIcon name={icon} size="M" /> : null}
								</span>
							)}
						</Tooltip>
					) : (
						[picto, text]
					)}
				</StackHorizontal>
			</span>
		);
	},
);

Status.displayName = 'StatusPrimitive';
export default Status;
