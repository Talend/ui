import {
	StatusDot,
	StatusDotBeta,
	StatusDotError,
	StatusDotInformation,
	StatusDotSuccess,
	StatusDotWarning,
} from '../../';
import { StatusDotProps, variants } from '../../components/StatusDot/Primitive/StatusDotPrimitive';

export const Beta = () => <StatusDotBeta />;
export const Error = () => <StatusDotError />;
export const Information = () => <StatusDotInformation />;
export const Success = () => <StatusDotSuccess />;
export const Warning = () => <StatusDotWarning />;

export const Usage = (props: StatusDotProps) => <StatusDot {...props} />;

Usage.args = {
	variant: variants.beta,
};

Usage.argTypes = {
	variant: {
		description: 'StatusDot variation',
		options: Object.values(variants),
		control: {
			type: 'select',
		},
	},
};

export default {
	title: 'Feedback/StatusDot',
	component: StatusDot,
};
