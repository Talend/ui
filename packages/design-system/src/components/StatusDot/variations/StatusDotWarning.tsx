import { forwardRef, Ref } from 'react';

import StatusDotPrimitive, { StatusDotProps, variants } from '../Primitive/StatusDotPrimitive';

export type StatusDotWarningProps = Omit<StatusDotProps, 'variant'>;

const StatusDotWarning = forwardRef((props: StatusDotWarningProps, ref: Ref<HTMLSpanElement>) => {
	return <StatusDotPrimitive variant={variants.warning} ref={ref} {...props} />;
});

StatusDotWarning.displayName = 'StatusDotWarning';

export default StatusDotWarning;
