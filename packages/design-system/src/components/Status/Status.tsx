import React from 'react';
import StatusFailed, { StatusFailedProps } from './variations/StatusFailed';
import StatusWarning, { StatusWarningProps } from './variations/StatusWarning';
import StatusSuccessful, { StatusSuccessfulProps } from './variations/StatusSuccessful';
import StatusInProgress, { StatusInProgressProps } from './variations/StatusInProgress';
import StatusCanceled, { StatusCanceledProps } from './variations/StatusCanceled';
import { possibleVariants } from './Primitive/StatusPrimitive';

type StatusProps = {
	variant: typeof possibleVariants[number];
} & (
	| StatusFailedProps
	| StatusWarningProps
	| StatusSuccessfulProps
	| StatusInProgressProps
	| StatusCanceledProps
);

const Status = React.forwardRef((props: StatusProps, ref: React.Ref<any>) => {
	const { variant, ...rest } = props;
	switch (variant) {
		case 'failed':
			return <StatusFailed {...rest} ref={ref} />;

		case 'warning':
			return <StatusWarning {...rest} ref={ref} />;

		case 'successful':
			return <StatusSuccessful {...rest} ref={ref} />;

		case 'inProgress':
			return <StatusInProgress {...rest} ref={ref} />;

		case 'canceled':
			return <StatusCanceled {...rest} ref={ref} />;

		default:
			return <StatusInProgress {...rest} ref={ref} />;
	}
});

export default Status;
