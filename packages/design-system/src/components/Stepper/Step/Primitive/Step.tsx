import React, { forwardRef, ReactElement, Ref } from 'react';
import classnames from 'classnames';

import { DeprecatedIconNames } from '../../../../types';
import { Icon } from '../../../Icon/Icon';
import Tooltip from '../../../Tooltip';

import styles from './Step.module.scss';

export type StepStatus = 'disabled' | 'enabled' | 'error' | 'progress' | 'skeleton' | 'validated';

export type StepPrimitiveProps = {
	title: string;
	tooltip?: string;
	icon?: DeprecatedIconNames;
	children?: string | ReactElement;
	status: StepStatus;
};

/**
 * Steps are the main elements for the stepper.
 */
const Step = forwardRef(
	(
		{ icon, title, tooltip, children, status, ...rest }: StepPrimitiveProps,
		ref: Ref<HTMLDivElement>,
	) => {
		const step = (
			<div ref={ref} {...rest} className={classnames(styles.step, [styles[`step_${status}`]])}>
				<span className={styles.step__title}>{children || title}</span>
				<span className={styles.step__icon} aria-hidden>
					{icon && <Icon name={icon} />}
				</span>
			</div>
		);
		return tooltip ? <Tooltip title={tooltip}>{step}</Tooltip> : step;
	},
);

Step.displayName = 'StepPrimitive';

export default Step;
