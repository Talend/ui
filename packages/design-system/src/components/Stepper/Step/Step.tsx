import React from 'react';
import { IconName } from '@talend/icons';
import { Icon } from '../../Icon/Icon';
import Tooltip, { TooltipPlacement } from '../../Tooltip';

import * as S from './Step.style';

export type StepProps = React.PropsWithRef<any> & {
	/** The title of the step */
	title: string;
	/** The optional class name */
	className?: string;
	/** The icon element to display */
	icon?: IconName;
	/** The optional tooltip to describe the step */
	tooltip?: string;
	/** The optional placement of the tooltip */
	tooltipPlacement?: TooltipPlacement;
};

/**
 * Steps are the main elements for the stepper.
 */
const Step: React.FC<StepProps> = React.forwardRef(
	({ icon, title, className = '', children, tooltip, tooltipPlacement, ...rest }: StepProps, ref) => {
		const step = (
			<S.Step ref={ref} {...rest} className={`step ${className || ''}`}>
					<span className="step__title">{children || title}</span>
					<span className="step__icon" aria-hidden>
						{icon && <Icon name={icon} />}
					</span>
				</S.Step>
		);

		return tooltip ? (
			<Tooltip title={tooltip} placement={tooltipPlacement}>
				{step}
			</Tooltip>
		) : (
			step
		);
	},
);

export default Step;
