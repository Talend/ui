import React from 'react';
import { StatusFailed, StatusCanceled, StatusInProgress, StatusSuccessful, StatusWarning } from '.';

export default {
	component: StatusInProgress,
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
