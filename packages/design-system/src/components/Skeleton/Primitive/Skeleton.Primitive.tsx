import { forwardRef, HTMLAttributes, Ref } from 'react';
import classNames from 'classnames';

import styles from './Skeleton.module.scss';

export type SkeletonPrimitiveProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style'> & {
	isBlock?: boolean;
};

const SkeletonPrimitive = forwardRef(
	({ className, isBlock, ...props }: SkeletonPrimitiveProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<span
				className={classNames(styles.skeleton, { [styles.isBlock]: isBlock }, className)}
				{...props}
				ref={ref}
				aria-hidden
			/>
		);
	},
);

export default SkeletonPrimitive;
