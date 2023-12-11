import { forwardRef, Ref } from 'react';

import classNames from 'classnames';

import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import styles from './SkeletonHeading.module.scss';

export type SkeletonHeadingProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	size?: 'L' | 'M' | 'S';
	width?: 'XS' | 'S' | 'M' | 'L' | 'XL' | '100%';
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
					[styles['width-XS']]: props.width === 'XS',
					[styles['width-S']]: props.width === 'S',
					[styles['width-M']]: props.width === 'M',
					[styles['width-L']]: props.width === 'L',
					[styles['width-XL']]: props.width === 'XL',
					[styles['width-100']]: props.width === '100%',
				})}
				{...props}
				ref={ref}
			/>
		);
	},
);
SkeletonHeading.displayName = 'SkeletonHeading';
export default SkeletonHeading;
