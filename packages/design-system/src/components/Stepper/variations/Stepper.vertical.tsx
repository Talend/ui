import { forwardRef, Ref } from 'react';
import Stepper, { StepperProps } from '../Stepper';

export type StepperVerticalProps = Omit<StepperProps, 'orientation'>;

export const StepperVertical = forwardRef(
	(props: StepperVerticalProps, ref: Ref<HTMLDivElement>) => (
		<Stepper {...props} ref={ref} orientation="vertical" />
	),
);

StepperVertical.displayName = 'StepperVertical';
