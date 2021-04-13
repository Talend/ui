import React from 'react';
import { IconName } from '@talend/icons';
import { Icon } from '../../Icon/Icon';

import * as S from './Step.style';

export type StepProps = React.PropsWithRef<any> & {
	/** The title of the step */
	title: string;
	/** The optional class name */
	className?: string;
	/** The icon element to display */
	icon?: IconName;
};

/**
 * Steps are the main elements for the stepper.
 */
const Step: React.FC<StepProps> = React.forwardRef(
	({ icon, title, className = '', ...rest }: StepProps, ref) => {
		return (
			<S.Step ref={ref} {...rest} className={`step ${className || ''}`}>
				<span className="step__title">{title}</span>
				<span className="step__icon" aria-hidden>
					{icon && <Icon name={icon} />}
				</span>
			</S.Step>
		);
	},
);

export default Step;
