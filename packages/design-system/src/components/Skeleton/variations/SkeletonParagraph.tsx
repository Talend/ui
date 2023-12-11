import { forwardRef, Ref } from 'react';

import classNames from 'classnames';

import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';

import styles from './SkeletonParagraph.module.scss';

export type SkeletonParagraphProps = Omit<SkeletonPrimitiveProps, 'className'> & {
	size?: 'M' | 'S';
	width?: 'XS' | 'S' | 'M' | 'L' | 'XL' | '100%';
};

const SkeletonParagraph = forwardRef(
	({ size = 'M', ...props }: SkeletonParagraphProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<SkeletonPrimitive
				isBlock
				className={classNames(styles.skeletonParagraph, {
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
SkeletonParagraph.displayName = 'SkeletonParagraph';

export default SkeletonParagraph;
