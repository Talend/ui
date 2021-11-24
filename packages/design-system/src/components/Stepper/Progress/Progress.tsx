import React from 'react';
import { useTranslation } from 'react-i18next';

import VisuallyHidden from '../../VisuallyHidden';

import { StepperOrientation } from '../Stepper';

import * as S from './Progress.style';

export type ProgressProps = React.PropsWithChildren<any> & {
	orientation: StepperOrientation;
	min?: number;
	value?: number;
	max?: number;
};

const Progress = ({ min = 1, value, max, orientation, children, ...rest }: ProgressProps) => {
	const { t } = useTranslation();
	const size = `${(value - 1) * (100 / (max - 1))}%`;
	return (
		<S.Progress
			role="progressbar"
			aria-valuemin={min}
			aria-valuenow={value}
			aria-valuemax={max}
			{...rest}
		>
			<div aria-hidden style={orientation === 'vertical' ? { height: size } : { width: size }} />
			<VisuallyHidden>
				{t('PROGRESS_ACTIVE_STEP', { defaultValue: 'Step {{value}} of {{max}}', value, max })}
			</VisuallyHidden>
			{children}
		</S.Progress>
	);
};

export default Progress;
