import { forwardRef, Ref } from 'react';

import StatusDotPrimitive, { StatusDotProps, variants } from '../Primitive/StatusDotPrimitive';

export type StatusDotSuccessProps = Omit<StatusDotProps, 'variant'>;

const StatusDotSuccess = forwardRef((props: StatusDotSuccessProps, ref: Ref<HTMLSpanElement>) => {
	return <StatusDotPrimitive variant={variants.success} ref={ref} {...props} />;
});

StatusDotSuccess.displayName = 'StatusDotSuccess';

export default StatusDotSuccess;
