import React, { PropsWithChildren } from 'react';
import * as S from './Stepper.style';

export type StepperProps = PropsWithChildren<any>;

const Stepper: React.FC<StepperProps> = React.forwardRef(
	({ children, ...rest }: StepperProps, ref) => (
		<S.Stepper role="list" {...rest} ref={ref}>
			{children &&
				React.Children.map(children, (child, index) => (
					<S.StepperStep key={index}>
						{React.cloneElement(child, { 'data-index': index + 1 })}
						<div aria-hidden className="stepper__progress-bar" />
					</S.StepperStep>
				))}
		</S.Stepper>
	),
);

export default Stepper;
