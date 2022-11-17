import React, { forwardRef, Ref } from 'react';
import Step, { StepPrimitiveProps } from '../Primitive/Step';

type StepValidatedTypes = Omit<StepPrimitiveProps, 'status'>;

const StepValidated = forwardRef((props: StepValidatedTypes, ref: Ref<HTMLLIElement>) => (
	<Step {...props} status="validated" ref={ref} />
));

StepValidated.displayName = 'StepValidated';

export default StepValidated;
