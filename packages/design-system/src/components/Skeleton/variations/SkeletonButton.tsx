import { forwardRef, Ref } from 'react';

import classNames from 'classnames';

import PrimitiveStyles from '../Primitive/Skeleton.module.css';
import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';
import styles from './SkeletonButton.module.css';

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
SkeletonButton.displayName = 'SkeletonButton';
export default SkeletonButton;
