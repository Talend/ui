import { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import PrimitiveStyles from '../Primitive/Skeleton.module.scss';
import styles from './SkeletonButton.module.scss';

export type SkeletonButtonProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	size?: 'M' | 'S';
};

const SkeletonButton = forwardRef(
	({ size = 'M', ...props }: SkeletonButtonProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<SkeletonPrimitive
				className={classNames(styles.buttonSkeleton, {
					[PrimitiveStyles['size-XL']]: size === 'M',
					[PrimitiveStyles['size-L']]: size === 'S',
					[styles.small]: size === 'S',
				})}
				{...props}
				ref={ref}
			/>
		);
	},
);

export default SkeletonButton;
