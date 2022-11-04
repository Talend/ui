import Progress from './Primitive/Progress';
import ProgressVertical from './variations/Progress.vertical';
import ProgressHorizontal from './variations/Progress.horizontal';

const ProgressComponent = Progress as typeof Progress & {
	Vertical: typeof ProgressVertical;
	Horizontal: typeof ProgressHorizontal;
};

ProgressComponent.Vertical = ProgressVertical;
ProgressComponent.Horizontal = ProgressHorizontal;

export default ProgressComponent;
