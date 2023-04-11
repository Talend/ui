import { SkeletonParagraph, SkeletonHeading } from '@talend/design-system';
import theme from './CodeSkeleton.module.scss';

export default function CodeSkeleton() {
	return (
		<div className={theme['code-widget__loading']}>
			<SkeletonHeading size="S" />
			<div className={theme['code-widget__loading__lines']}>
				<SkeletonParagraph />
				<SkeletonParagraph />
				<SkeletonParagraph />
			</div>
		</div>
	);
}
