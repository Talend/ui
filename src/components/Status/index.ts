import StatusComponent from './Status';
import StatusSuccessful from './variations/Status.successful';
import StatusInProgress from './variations/Status.inprogress';
import StatusCanceled from './variations/Status.canceled';
import StatusWarning from './variations/Status.warning';
import StatusFailed from './variations/Status.failed';

const Status = StatusComponent as typeof StatusComponent & {
	Successful: typeof StatusSuccessful;
	InProgress: typeof StatusInProgress;
	Canceled: typeof StatusCanceled;
	Warning: typeof StatusWarning;
	Failed: typeof StatusFailed;
};

Status.Successful = StatusSuccessful;
Status.InProgress = StatusInProgress;
Status.Canceled = StatusCanceled;
Status.Warning = StatusWarning;
Status.Failed = StatusFailed;

export default StatusComponent;
