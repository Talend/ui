import React, { forwardRef, Ref } from 'react';
import Stepper, { StepperProps } from '../Stepper';

type StepperHorizontalProps = Omit<StepperProps, 'orientation'>;

const StepperHorizontal = forwardRef((props: StepperHorizontalProps, ref: Ref<HTMLDivElement>) => (
	<Stepper {...props} ref={ref} orientation="horizontal" />
));

StepperHorizontal.displayName = 'StepperHorizontal';

export default StepperHorizontal;
