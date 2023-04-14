import { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import styles from './SkeletonHeading.module.scss';

export type SkeletonHeadingProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	size?: 'L' | 'M' | 'S';
};

const SkeletonHeading = forwardRef(
	({ size = 'L', ...props }: SkeletonHeadingProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<SkeletonPrimitive
				isBlock
				className={classNames(styles.skeletonHeading, {
					[styles['size-L']]: size === 'L',
					[styles['size-M']]: size === 'M',
					[styles['size-S']]: size === 'S',
				})}
				{...props}
				ref={ref}
			/>
		);
	},
);

export default SkeletonHeading;
