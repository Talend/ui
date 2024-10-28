import { forwardRef, Ref } from 'react';

import StatusBubblePrimitive, {
	StatusBubbleProps,
	variants,
} from '../Primitive/StatusBubblePrimitive';

export type StatusBubbleInformationProps = Omit<StatusBubbleProps, 'variant'>;

const StatusBubbleInformation = forwardRef(
	(props: StatusBubbleInformationProps, ref: Ref<HTMLSpanElement>) => {
		return <StatusBubblePrimitive variant={variants.information} ref={ref} {...props} />;
	},
);

StatusBubbleInformation.displayName = 'StatusBubbleInformation';

export default StatusBubbleInformation;
