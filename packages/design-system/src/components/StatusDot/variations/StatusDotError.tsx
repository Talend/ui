import { forwardRef, Ref } from 'react';

import StatusDotPrimitive, { StatusDotProps, variants } from '../Primitive/StatusDotPrimitive';

export type StatusDotErrorProps = Omit<StatusDotProps, 'variant'>;

const StatusDotError = forwardRef((props: StatusDotErrorProps, ref: Ref<HTMLSpanElement>) => {
	return <StatusDotPrimitive variant={variants.error} ref={ref} {...props} />;
});

StatusDotError.displayName = 'StatusDotError';

export default StatusDotError;
