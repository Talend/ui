import { forwardRef, Ref } from 'react';

import classNames from 'classnames';

import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import styles from './SkeletonHeading.module.css';

export type SkeletonHeadingProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	size?: 'L' | 'M' | 'S';
	width?: 'XS' | 'S' | 'M' | 'L' | 'XL' | '100';
};

const SkeletonHeading = forwardRef(
	({ size = 'L', width, ...props }: SkeletonHeadingProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<SkeletonPrimitive
				isBlock
				className={classNames(styles.skeletonHeading, {
					[styles[`size-${size}`]]: size,
					[styles[`width-${width}`]]: width,
				})}
				{...props}
				ref={ref}
			/>
		);
	},
);
SkeletonHeading.displayName = 'SkeletonHeading';
export default SkeletonHeading;
