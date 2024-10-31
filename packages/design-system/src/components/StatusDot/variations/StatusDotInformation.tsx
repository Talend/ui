import { forwardRef, Ref } from 'react';

import StatusDotPrimitive, { StatusDotProps, variants } from '../Primitive/StatusDotPrimitive';

export type StatusDotInformationProps = Omit<StatusDotProps, 'variant'>;

const StatusDotInformation = forwardRef(
	(props: StatusDotInformationProps, ref: Ref<HTMLSpanElement>) => {
		return <StatusDotPrimitive variant={variants.information} ref={ref} {...props} />;
	},
);

StatusDotInformation.displayName = 'StatusDotInformation';

export default StatusDotInformation;
