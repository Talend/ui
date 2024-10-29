import { forwardRef, Ref } from 'react';

import StatusBubblePrimitive, {
	StatusBubbleProps,
	variants,
} from '../Primitive/StatusBubblePrimitive';

export type StatusBubbleWarningProps = Omit<StatusBubbleProps, 'variant'>;

const StatusBubbleWarning = forwardRef(
	(props: StatusBubbleWarningProps, ref: Ref<HTMLSpanElement>) => {
		return <StatusBubblePrimitive variant={variants.warning} ref={ref} {...props} />;
	},
);

StatusBubbleWarning.displayName = 'StatusBubbleWarning';

export default StatusBubbleWarning;
