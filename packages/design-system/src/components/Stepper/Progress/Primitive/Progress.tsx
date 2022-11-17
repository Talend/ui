import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import VisuallyHidden from '../../../VisuallyHidden';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../../constants';

import styles from './Progress.module.scss';

type StepperOrientation = 'vertical' | 'horizontal';

export type ProgressProps = {
	orientation: StepperOrientation;
	min?: number;
	value?: number;
	max?: number;
	children?: ReactElement;
} & HTMLAttributes<HTMLDivElement>;

const Progress = forwardRef((props: ProgressProps, ref: Ref<HTMLDivElement>) => {
	const { min = 1, value, max, orientation, children, className, ...rest } = props;
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
	const size = `${((value || 1) - 1) * (100 / ((max || 1) - 1))}%`;
	return (
		<div
			className={classnames(styles.progress, className)}
			role="progressbar"
			aria-valuemin={min}
			aria-valuenow={value}
			aria-valuemax={max}
			ref={ref}
			{...rest}
		>
			<div aria-hidden style={orientation === 'vertical' ? { height: size } : { width: size }} />
			<VisuallyHidden>
				{t('PROGRESS_ACTIVE_STEP', { defaultValue: 'Step {{value}} of {{max}}', value, max })}
			</VisuallyHidden>
			{children}
		</div>
	);
});

export default Progress;
