import { forwardRef, Ref } from 'react';

import { StatusBubbleProps, variants } from './Primitive/StatusBubblePrimitive';
import StatusBubbleBeta from './variations/StatusBubbleBeta';
import StatusBubbleError from './variations/StatusBubbleError';
import StatusBubbleInformation from './variations/StatusBubbleInformation';
import StatusBubbleSuccess from './variations/StatusBubbleSuccess';
import StatusBubbleWarning from './variations/StatusBubbleWarning';

const StatusBubble = forwardRef((props: StatusBubbleProps, ref: Ref<HTMLSpanElement>) => {
	switch (props.variant) {
		case variants.beta:
			return <StatusBubbleBeta {...props} ref={ref} />;
		case variants.error:
			return <StatusBubbleError {...props} ref={ref} />;
		case variants.information:
			return <StatusBubbleInformation {...props} ref={ref} />;
		case variants.success:
			return <StatusBubbleSuccess {...props} ref={ref} />;
		case variants.warning:
			return <StatusBubbleWarning {...props} ref={ref} />;
		default:
			return null;
	}
});

export default StatusBubble;
