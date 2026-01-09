import { forwardRef, Ref } from 'react';

import classNames from 'classnames';

import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import style from './SkeletonSized.module.css';

export type SkeletonSizedProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	height?: string;
	width?: string;
	isCircle?: boolean;
};

const SkeletonSized = forwardRef(
	(
		{ height = '1.4rem', width = '2rem', isCircle, ...props }: SkeletonSizedProps,
		ref: Ref<HTMLSpanElement>,
	) => (
		<SkeletonPrimitive
			// @ts-expect-error style is valid
			style={{ height, width }}
			className={classNames({ [style['skeleton-sized-circle']]: isCircle })}
			{...props}
			ref={ref}
		/>
	),
);
SkeletonSized.displayName = 'SkeletonSized';

export default SkeletonSized;
