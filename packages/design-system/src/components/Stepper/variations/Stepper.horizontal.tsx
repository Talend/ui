import { forwardRef, Ref } from 'react';
import Stepper, { StepperProps } from '../Stepper';

export type StepperHorizontalProps = Omit<StepperProps, 'orientation'>;

export const StepperHorizontal = forwardRef(
	(props: StepperHorizontalProps, ref: Ref<HTMLDivElement>) => (
		<Stepper {...props} ref={ref} orientation="horizontal" />
	),
);

StepperHorizontal.displayName = 'StepperHorizontal';
