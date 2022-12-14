import React, { forwardRef, Ref } from 'react';
import Step, { StepPrimitiveProps } from '../Primitive/Step';

type StepErrorTypes = Omit<StepPrimitiveProps, 'status'>;

const StepError = forwardRef((props: StepErrorTypes, ref: Ref<HTMLLIElement>) => (
	<Step {...props} status="error" ref={ref} />
));

StepError.displayName = 'StepError';

export default StepError;
