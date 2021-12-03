import Skeleton from './Skeleton';
import SkeletonButton from './variations/Skeleton.Button';
import SkeletonHeading from './variations/Skeleton.Heading';
import SkeletonIconButton from './variations/Skeleton.IconButton';

const SkeletonComponent = Skeleton as typeof Skeleton & {
	Button: typeof SkeletonButton;
	Heading: typeof SkeletonHeading;
	Icon: typeof SkeletonIconButton;
};

SkeletonComponent.Button = SkeletonButton;
SkeletonComponent.Heading = SkeletonHeading;
SkeletonComponent.Icon = SkeletonIconButton;

export default SkeletonComponent;
