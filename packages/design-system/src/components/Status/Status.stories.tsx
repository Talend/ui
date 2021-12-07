import React from 'react';
import Status from '.';

export default {
	component: Status,
};

export const InProgress = () => <Status.InProgress />;
export const Successful = () => <Status.Successful />;
export const Failed = () => <Status.Failed />;
export const Warning = () => <Status.Warning />;
export const Canceled = () => <Status.Canceled />;
export const CustomSuccessful = () => <Status.Successful>Done</Status.Successful>;

export const InProgressIcon = () => <Status.InProgress hideText />;
export const SuccessfulIcon = () => <Status.Successful hideText />;
export const FailedIcon = () => <Status.Failed hideText />;
export const WarningIcon = () => <Status.Warning hideText />;
export const CanceledIcon = () => <Status.Canceled hideText />;
export const CustomInProgressIcon = () => (
	<Status.InProgress hideText>Wait until it's loading</Status.InProgress>
);
