import { forwardRef, Ref } from 'react';

import classNames from 'classnames';

import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import style from './SkeletonSized.module.scss';

export type SkeletonSizedProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	height?: number;
	width?: number;
	isCircle?: boolean;
};

const SkeletonSized = forwardRef(
	(
		{ height = 1.4, width = 2, isCircle, ...props }: SkeletonSizedProps,
		ref: Ref<HTMLSpanElement>,
	) => {
		return (
			<SkeletonPrimitive
				// @ts-expect-error style is valid
				style={{ height: `${height}rem`, width: `${width}rem` }}
				className={classNames({ [style['skeleton-sized-circle']]: isCircle })}
				{...props}
				ref={ref}
			/>
		);
	},
);
SkeletonSized.displayName = 'SkeletonSized';

export default SkeletonSized;
