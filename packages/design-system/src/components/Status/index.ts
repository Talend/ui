import Status from './Status';
import StatusSuccessful from './variations/Status.successful';
import StatusInProgress from './variations/Status.inprogress';
import StatusCanceled from './variations/Status.canceled';
import StatusWarning from './variations/Status.warning';
import StatusFailed from './variations/Status.failed';

const StatusComponent = Status as typeof Status & {
	Successful: typeof StatusSuccessful;
	InProgress: typeof StatusInProgress;
	Canceled: typeof StatusCanceled;
	Warning: typeof StatusWarning;
	Failed: typeof StatusFailed;
};

StatusComponent.Successful = StatusSuccessful;
StatusComponent.InProgress = StatusInProgress;
StatusComponent.Canceled = StatusCanceled;
StatusComponent.Warning = StatusWarning;
StatusComponent.Failed = StatusFailed;

export default StatusComponent;
