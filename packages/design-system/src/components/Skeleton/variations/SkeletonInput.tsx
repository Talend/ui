import { StackVertical } from '../../Stack';
import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';
import styles from './SkeletonInput.module.scss';
import SkeletonParagraph from './SkeletonParagraph';
import React, { forwardRef, Ref } from 'react';

export type SkeletonInputProps = Omit<SkeletonPrimitiveProps, 'className'>;

const SkeletonInput = forwardRef((props: SkeletonInputProps, ref: Ref<HTMLSpanElement>) => {
	return (
		<StackVertical gap="XXS" {...props} ref={ref}>
			<div className={styles.skeletonInput__label}>
				<SkeletonParagraph size="S" />
			</div>
			<SkeletonPrimitive isBlock className={styles.skeletonInput} />
		</StackVertical>
	);
});

export default SkeletonInput;
