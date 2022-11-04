import { StackVertical } from '../../Stack';
import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';
import styles from './SkeletonInput.module.scss';
import SkeletonParagraph from './SkeletonParagraph';
import React, { forwardRef, Ref } from 'react';

export type SkeletonInputProps = Omit<SkeletonPrimitiveProps, 'className'>;

const SkeletonInput = forwardRef((props: SkeletonInputProps, ref: Ref<HTMLSpanElement>) => {
	return (
		<StackVertical as="span" gap="XXS" align="stretch" {...props} ref={ref}>
			<span className={styles['skeleton-input__label']}>
				<SkeletonParagraph size="S" />
			</span>
			<SkeletonPrimitive isBlock className={styles.skeletonInput} />
		</StackVertical>
	);
});

SkeletonInput.displayName = 'SkeletonInput';

export default SkeletonInput;
