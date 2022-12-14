import React, { forwardRef, Ref } from 'react';
import Step, { StepPrimitiveProps } from '../Primitive/Step';

type StepEnabledTypes = Omit<StepPrimitiveProps, 'status'>;

const StepEnabled = forwardRef((props: StepEnabledTypes, ref: Ref<HTMLLIElement>) => (
	<Step {...props} status="enabled" ref={ref} />
));

StepEnabled.displayName = 'StepEnabled';

export default StepEnabled;
