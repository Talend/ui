import React, { forwardRef, Ref } from 'react';
import Step, { StepPrimitiveProps } from '../Primitive/Step';

type StepProgressTypes = Omit<StepPrimitiveProps, 'status'>;

const StepProgress = forwardRef((props: StepProgressTypes, ref: Ref<HTMLLIElement>) => (
	<Step {...props} status="progress" ref={ref} />
));

StepProgress.displayName = 'StepProgress';

export default StepProgress;
