import React, { forwardRef, Ref } from 'react';
import Stepper, { StepperProps } from '../Stepper';

type StepperVerticalProps = Omit<StepperProps, 'orientation'>;

const StepperVertical = forwardRef((props: StepperVerticalProps, ref: Ref<HTMLDivElement>) => (
	<Stepper {...props} ref={ref} orientation="vertical" />
));

StepperVertical.displayName = 'StepperVertical';

export default StepperVertical;
