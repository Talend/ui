import { forwardRef, Ref } from 'react';

import StatusDotPrimitive, { StatusDotProps, variants } from '../Primitive/StatusDotPrimitive';

export type StatusDotBetaProps = Omit<StatusDotProps, 'variant'>;

const StatusDotBeta = forwardRef((props: StatusDotBetaProps, ref: Ref<HTMLSpanElement>) => {
	return <StatusDotPrimitive variant={variants.beta} ref={ref} {...props} />;
});

StatusDotBeta.displayName = 'StatusDotBeta';

export default StatusDotBeta;
