import { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import PrimitiveStyles from '../Primitive/Skeleton.module.scss';
import styles from './SkeletonButtonIcon.module.scss';

export type SkeletonButtonIconProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	size?: 'M' | 'S' | 'XS';
};

const SkeletonButtonIcon = forwardRef(
	({ size = 'M', ...props }: SkeletonButtonIconProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<SkeletonPrimitive
				className={classNames(styles.buttonIconSkeleton, {
					[PrimitiveStyles['size-XL']]: size === 'M',
					[PrimitiveStyles['size-L']]: size === 'S',
					[PrimitiveStyles['size-M']]: size === 'XS',
					[styles['size-S']]: size === 'S',
					[styles['size-XS']]: size === 'XS',
				})}
				{...props}
				ref={ref}
			/>
		);
	},
);

export default SkeletonButtonIcon;
