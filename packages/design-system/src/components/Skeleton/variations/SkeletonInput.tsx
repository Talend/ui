import React, { forwardRef, Ref } from 'react';
import { StackVertical } from '../../Stack';
import SkeletonPrimitive, { SkeletonPrimitiveProps } from '../Primitive/Skeleton.Primitive';
import SkeletonHeading from './SkeletonHeading';

import styles from './SkeletonInput.module.scss';

export type SkeletonInputProps = Omit<SkeletonPrimitiveProps, 'className'>;

const SkeletonInput = forwardRef((props: SkeletonInputProps, ref: Ref<HTMLSpanElement>) => {
	return (
		<StackVertical gap="XXS" as="span" {...props} ref={ref}>
			<SkeletonHeading size="S" />
			<SkeletonPrimitive isBlock className={styles.skeletonInput} />
		</StackVertical>
	);
});

export default SkeletonInput;
