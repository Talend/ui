import React, { forwardRef, Ref } from 'react';
import Skeleton from '../../../Skeleton';
import classnames from 'classnames';

import stepStyles from '../Primitive/Step.module.scss';
import styles from './Step.Skeleton.module.scss';

type SkeletonProps = { orientation?: 'vertical' | 'horizontal' };

const StepSkeleton = forwardRef((props: SkeletonProps, ref: Ref<HTMLLIElement>) => {
	const { orientation = 'horizontal' } = props;
	return (
		<li aria-current={false} className={stepStyles.stepWrapper} ref={ref}>
			<div
				className={classnames(styles.skeleton, {
					[styles.skeleton_vertical]: orientation === 'vertical',
				})}
			>
				<Skeleton variant="heading" size="M" />
			</div>
		</li>
	);
});

export default React.memo(StepSkeleton);
