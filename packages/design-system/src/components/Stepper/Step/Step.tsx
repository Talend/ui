import React from 'react';
// eslint-disable-next-line @talend/import-depth
import { IconName } from '@talend/icons/dist/Figma';
import { Icon } from '../../Icon/Icon';
import * as S from './Step.style';
import Tooltip from '../../Tooltip';

export type StepProps = React.PropsWithRef<any> & {
	/** The title of the step */
	title: string;
	/** The title of the step */
	tooltip?: string;
	/** The optional class name */
	className?: string;
	/** The icon element to display */
	icon?: IconName;
};

/**
 * Steps are the main elements for the stepper.
 */
const Step: React.FC<StepProps> = React.forwardRef(
	({ icon, title, className = '', tooltip, children, ...rest }: StepProps, ref) => {
		const step = (
			<S.Step ref={ref} {...rest} className={`step ${className || ''}`}>
				<span className="step__title">{children || title}</span>
				<span className="step__icon" aria-hidden>
					{icon && <Icon name={icon} />}
				</span>
			</S.Step>
		);
		return tooltip ? <Tooltip title={tooltip}>{step}</Tooltip> : step;
	},
);

export default Step;
