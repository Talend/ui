import { forwardRef, Ref } from 'react';
import Step, { StepPrimitiveProps } from '../Primitive/Step';

type StepDisabledTypes = Omit<StepPrimitiveProps, 'status'>;

const StepDisabled = forwardRef((props: StepDisabledTypes, ref: Ref<HTMLLIElement>) => (
	<Step {...props} status="disabled" ref={ref} />
));

StepDisabled.displayName = 'StepDisabled';

export default StepDisabled;
