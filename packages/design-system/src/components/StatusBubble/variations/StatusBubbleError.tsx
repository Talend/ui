import { forwardRef, Ref } from 'react';

import StatusBubblePrimitive, {
	StatusBubbleProps,
	variants,
} from '../Primitive/StatusBubblePrimitive';

export type StatusBubbleErrorProps = Omit<StatusBubbleProps, 'variant'>;

const StatusBubbleError = forwardRef((props: StatusBubbleErrorProps, ref: Ref<HTMLSpanElement>) => {
	return <StatusBubblePrimitive variant={variants.error} ref={ref} {...props} />;
});

StatusBubbleError.displayName = 'StatusBubbleError';

export default StatusBubbleError;
