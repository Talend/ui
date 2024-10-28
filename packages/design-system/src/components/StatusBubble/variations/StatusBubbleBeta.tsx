import { forwardRef, Ref } from 'react';

import StatusBubblePrimitive, {
	StatusBubbleProps,
	variants,
} from '../Primitive/StatusBubblePrimitive';

export type StatusBubbleBetaProps = Omit<StatusBubbleProps, 'variant'>;

const StatusBubbleBeta = forwardRef((props: StatusBubbleBetaProps, ref: Ref<HTMLSpanElement>) => {
	return <StatusBubblePrimitive variant={variants.beta} ref={ref} {...props} />;
});

StatusBubbleBeta.displayName = 'StatusBubbleBeta';

export default StatusBubbleBeta;
