import { forwardRef, Ref } from 'react';

import { StatusDotProps, variants } from './Primitive/StatusDotPrimitive';
import StatusDotBeta from './variations/StatusDotBeta';
import StatusDotError from './variations/StatusDotError';
import StatusDotInformation from './variations/StatusDotInformation';
import StatusDotSuccess from './variations/StatusDotSuccess';
import StatusDotWarning from './variations/StatusDotWarning';

const StatusBubble = forwardRef((props: StatusDotProps, ref: Ref<HTMLSpanElement>) => {
	switch (props.variant) {
		case variants.beta:
			return <StatusDotBeta {...props} ref={ref} />;
		case variants.error:
			return <StatusDotError {...props} ref={ref} />;
		case variants.information:
			return <StatusDotInformation {...props} ref={ref} />;
		case variants.success:
			return <StatusDotSuccess {...props} ref={ref} />;
		case variants.warning:
			return <StatusDotWarning {...props} ref={ref} />;
		default:
			return null;
	}
});

export default StatusBubble;
