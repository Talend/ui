import React, { forwardRef, Ref } from 'react';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

import classnames from 'classnames';
import styles from './BadgeValue.module.scss';
import { StackHorizontal } from '../../Stack';
import Divider from '../../Divider';

export type BadgeValueProps = BadgePrimitiveProps & {
	value: string[];
};

const BadgeValue = forwardRef((props: BadgeValueProps, ref: Ref<HTMLSpanElement>) => {
	const { value } = props;

	return (
		<BadgePrimitive {...props} ref={ref} withDivider>
			<span className={classnames(styles['badge-value__children'])}>
				<StackHorizontal gap="XS" as="span" align="center">
					{value.map((item: string, idx: number) => (
						<React.Fragment key={`fragment-${item}`}>
							{idx > 0 && <Divider key={`divider-${item}`} orientation="vertical" />}
							{item}
						</React.Fragment>
					))}
				</StackHorizontal>
			</span>
		</BadgePrimitive>
	);
});

BadgeValue.displayName = 'BadgeValue';

export default BadgeValue;
