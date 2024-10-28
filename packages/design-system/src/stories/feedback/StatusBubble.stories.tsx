import {
	StatusBubble,
	StatusBubbleBeta,
	StatusBubbleError,
	StatusBubbleInformation,
	StatusBubbleSuccess,
	StatusBubbleWarning,
} from '../../';
import {
	StatusBubbleProps,
	variants,
} from '../../components/StatusBubble/Primitive/StatusBubblePrimitive';

export const Beta = () => <StatusBubbleBeta />;
export const Error = () => <StatusBubbleError />;
export const Information = () => <StatusBubbleInformation />;
export const Success = () => <StatusBubbleSuccess />;
export const Warning = () => <StatusBubbleWarning />;

export const Usage = (props: StatusBubbleProps) => <StatusBubble {...props} />;

Usage.args = {
	variant: variants.beta,
};

Usage.argTypes = {
	variant: {
		description: 'StatusBubble variation',
		options: Object.values(variants),
		control: {
			type: 'select',
		},
	},
};

export default {
	title: 'Feedback/StatusBubble',
	component: StatusBubble,
};
