import { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import styles from './SkeletonParagraph.module.scss';

export type SkeletonParagraphProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	size?: 'M' | 'S';
};

const SkeletonParagraph = forwardRef(
	({ size = 'M', ...props }: SkeletonParagraphProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<SkeletonPrimitive
				isBlock
				className={classNames(styles.skeletonParagraph, {
					[styles['size-M']]: size === 'M',
					[styles['size-S']]: size === 'S',
				})}
				{...props}
				ref={ref}
			/>
		);
	},
);

export default SkeletonParagraph;
