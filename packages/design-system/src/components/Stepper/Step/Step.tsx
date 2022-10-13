import React, { FC, forwardRef, PropsWithRef } from 'react';
import { DeprecatedIconNames } from '../../../types';
import { Icon } from '../../Icon/Icon';
import Tooltip from '../../Tooltip';

import styles from './Step.module.scss';

export type StepProps = PropsWithRef<any> & {
	/** The title of the step */
	title: string;
	/** The title of the step */
	tooltip?: string;
	/** The icon element to display */
	icon?: DeprecatedIconNames;
};

/**
 * Steps are the main elements for the stepper.
 */
const Step: FC<StepProps> = forwardRef(
	({ icon, title, tooltip, children, ...rest }: StepProps, ref) => {
		const step = (
			<div ref={ref} {...rest} className={styles.step}>
				<span className={styles.step__title}>{children || title}</span>
				<span className={styles.step__icon} aria-hidden>
					{icon && <Icon name={icon} />}
				</span>
			</div>
		);
		return tooltip ? <Tooltip title={tooltip}>{step}</Tooltip> : step;
	},
);

export default Step;
