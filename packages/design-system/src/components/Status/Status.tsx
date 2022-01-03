import React from 'react';
import StatusFailed, { StatusFailedProps } from './variations/StatusFailed';
import StatusWarning, { StatusWarningProps } from './variations/StatusWarning';
import StatusSuccessful, { StatusSuccessfulProps } from './variations/StatusSuccessful';
import StatusInProgress, { StatusInProgressProps } from './variations/StatusInProgress';
import StatusCanceled, { StatusCanceledProps } from './variations/StatusCanceled';
import { variants } from './Primitive/StatusPrimitive';

type StatusProps = {
	variant: keyof typeof variants;
} & (
	| StatusFailedProps
	| StatusWarningProps
	| StatusSuccessfulProps
	| StatusInProgressProps
	| StatusCanceledProps
);

const Status = React.forwardRef((props: StatusProps, ref: React.Ref<HTMLSpanElement>) => {
	const { variant, ...rest } = props;
	switch (variant) {
		case variants.failed:
			return <StatusFailed {...rest} ref={ref} />;

		case variants.warning:
			return <StatusWarning {...rest} ref={ref} />;

		case variants.successful:
			return <StatusSuccessful {...rest} ref={ref} />;

		case variants.inProgress:
			return <StatusInProgress {...rest} ref={ref} />;

		case variants.canceled:
			return <StatusCanceled {...rest} ref={ref} />;

		default:
			return <StatusInProgress {...rest} ref={ref} />;
	}
});

export default Status;
