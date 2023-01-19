import React, { forwardRef, Ref } from 'react';

import classnames from 'classnames';

import Divider from '../../Divider';
import { StackHorizontal } from '../../Stack';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

import styles from './BadgeValue.module.scss';

export type BadgeValueProps = BadgePrimitiveProps & {
	/**
	 * List of label to display in Badge's right part.
	 */
	value: string[];
};

const BadgeValue = forwardRef((props: BadgeValueProps) => {
	const { value } = props;

	return (
		<BadgePrimitive {...props}>
			<span className={classnames(styles['badge-value__children'])} data-testid="badge-value">
				<StackHorizontal gap="XS" as="span" align="center">
					{value.map((item: string, idx: number) => (
						<React.Fragment key={`badgevalue-fragment-${item}`}>
							{idx > 0 && <Divider key={`badgevalue-divider-${item}`} orientation="vertical" />}

							<span data-testid={`badgevalue-${item}`} key={`badgevalue-value-${item}`}>
								{item}
							</span>
						</React.Fragment>
					))}
				</StackHorizontal>
			</span>
		</BadgePrimitive>
	);
});

BadgeValue.displayName = 'BadgeValue';

export default BadgeValue;
