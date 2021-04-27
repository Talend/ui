import React, { PropsWithChildren } from 'react';
import { isMemo, isElement } from 'react-is';

import * as S from './Stepper.style';

export type StepperOrientation = 'horizontal' | 'vertical';

export type StepperProps = PropsWithChildren<any> & {
	orientation: StepperOrientation;
	loading?: boolean;
};

const Stepper: React.FC<StepperProps> = React.forwardRef(
	({ children, orientation, loading, ...rest }: StepperProps, ref) => {
		const isInProgress = (child: React.ReactNode) =>
			// Use isMemo to be sure to only test React.ReactElement and its attrs
			isMemo(child) && Array.isArray(child.type.type.attrs) && child.type.type.attrs[0].active;
		const lastIndex = React.Children.toArray(children).map(isInProgress).lastIndexOf(true);
		const value = lastIndex + 1;
		const max = React.Children.count(children);
		const ProgressBar =
			orientation === 'vertical' ? S.StepperProgressBar.Vertical : S.StepperProgressBar.Horizontal;
		return (
			<S.Stepper {...rest} ref={ref}>
				<ProgressBar value={value} max={max} />
				<S.StepperSteps>
					{children &&
						React.Children.map(
							children,
							(child, index) =>
								isElement(child) && (
									<S.StepperStep key={index} aria-current={isInProgress(child) ? 'step' : false}>
										{React.cloneElement(child, { 'data-index': index + 1 })}
									</S.StepperStep>
								),
						)}
				</S.StepperSteps>
			</S.Stepper>
		);
	},
);

export default Stepper;
