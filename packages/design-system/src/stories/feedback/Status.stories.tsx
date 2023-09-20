import {
	StatusFailed,
	StatusCanceled,
	StatusInProgress,
	StatusSuccessful,
	StatusWarning,
	Status,
} from '../../';
import { variants } from '../../components/Status/Primitive/StatusPrimitive';

export default {
	component: StatusInProgress,
	title: 'Feedback/Status',
};

export const InProgress = () => <StatusInProgress />;
export const Successful = () => <StatusSuccessful />;
export const Failed = () => <StatusFailed />;
export const Warning = () => <StatusWarning />;
export const Canceled = () => <StatusCanceled />;
export const CustomSuccessful = () => <StatusSuccessful>Done</StatusSuccessful>;

export const InProgressIcon = () => <StatusInProgress hideText />;
export const SuccessfulIcon = () => <StatusSuccessful hideText />;
export const FailedIcon = () => <StatusFailed hideText />;
export const WarningIcon = () => <StatusWarning hideText />;
export const CanceledIcon = () => <StatusCanceled hideText />;
export const CustomInProgressIcon = () => (
	<StatusInProgress hideText>Wait until it's done loading</StatusInProgress>
);

export const Usage = (props: any) => <Status {...props} />;
Usage.args = {
	variant: 'warning',
	hideText: false,
	children: 'Done',
};
Usage.argTypes = {
	variant: {
		description: 'Status variation',
		control: {
			type: 'select',
			options: Object.values(variants),
		},
	},
	hideText: {
		description: 'If Status should hide text or not',
		control: {
			type: 'boolean',
		},
	},
	children: {
		description: 'Status text',
		control: {
			type: 'text',
		},
	},
};
