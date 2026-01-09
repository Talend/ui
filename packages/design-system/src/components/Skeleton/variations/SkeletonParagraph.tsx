import { forwardRef, Ref } from 'react';

import classNames from 'classnames';

import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import styles from './SkeletonParagraph.module.css';

export type SkeletonParagraphProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	size?: 'M' | 'S';
	width?: 'XS' | 'S' | 'M' | 'L' | 'XL' | '100';
};

const SkeletonParagraph = forwardRef(
	({ size = 'M', width, ...props }: SkeletonParagraphProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<SkeletonPrimitive
				isBlock
				className={classNames(styles.skeletonParagraph, {
					[styles[`size-${size}`]]: size,
					[styles[`width-${width}`]]: width,
				})}
				{...props}
				ref={ref}
			/>
		);
	},
);
SkeletonParagraph.displayName = 'SkeletonParagraph';

export default SkeletonParagraph;
