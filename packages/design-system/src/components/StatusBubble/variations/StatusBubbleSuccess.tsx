import { forwardRef, Ref } from 'react';

import StatusBubblePrimitive, {
	StatusBubbleProps,
	variants,
} from '../Primitive/StatusBubblePrimitive';

export type StatusBubbleSuccessProps = Omit<StatusBubbleProps, 'variant'>;

const StatusBubbleSuccess = forwardRef(
	(props: StatusBubbleSuccessProps, ref: Ref<HTMLSpanElement>) => {
		return <StatusBubblePrimitive variant={variants.success} ref={ref} {...props} />;
	},
);

StatusBubbleSuccess.displayName = 'StatusBubbleSuccess';

export default StatusBubbleSuccess;
