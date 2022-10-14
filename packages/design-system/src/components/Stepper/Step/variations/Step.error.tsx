import React, { forwardRef, Ref } from 'react';
import Step, { StepPrimitiveProps } from '../Primitive/Step';

type StepErrorTypes = Omit<StepPrimitiveProps, 'status' | 'icon'>;

const StepError = forwardRef((props: StepErrorTypes, ref: Ref<HTMLLIElement>) => (
	<Step {...props} status="error" icon="talend-cross-circle" ref={ref} />
));

StepError.displayName = 'StepError';

export default StepError;
