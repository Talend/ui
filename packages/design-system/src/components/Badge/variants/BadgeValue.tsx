import React, { forwardRef, Ref } from 'react';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

import classnames from 'classnames';
import styles from './BadgeValue.module.scss';

export type BadgeValueProps = Omit<BadgePrimitiveProps, 'withDivider'> & {
	value: string;
};

const BadgeValue = forwardRef((props: BadgeValueProps, ref: Ref<HTMLSpanElement>) => {
	const { isReadOnly, value } = props;

	return (
		<BadgePrimitive {...props} ref={ref} withDivider>
			<span
				className={classnames(styles.badge__layout__children, {
					[styles.readonly]: isReadOnly,
				})}
			>
				{value}
			</span>
		</BadgePrimitive>
	);
});

BadgeValue.displayName = 'BadgeValue';

export default BadgeValue;
