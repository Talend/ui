import Skeleton from './Skeleton';
import SkeletonButton from './variations/Skeleton.Button';
import SkeletonIconButton from './variations/Skeleton.IconButton';

const SkeletonComponent = Skeleton as typeof Skeleton & {
	Button: typeof SkeletonButton;
	Icon: typeof SkeletonIconButton;
};

SkeletonComponent.Button = SkeletonButton;
SkeletonComponent.Icon = SkeletonIconButton;

export default SkeletonComponent;
