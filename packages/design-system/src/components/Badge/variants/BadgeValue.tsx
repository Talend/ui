import { forwardRef, Fragment, Ref } from 'react';

import classnames from 'classnames';

import { Divider } from '../../Divider';
import { StackHorizontal } from '../../Stack';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

import styles from './BadgeValue.module.css';

export type BadgeValueProps = BadgePrimitiveProps & {
	/**
	 * List of label to display in Badge's right part.
	 */
	value: string[];
};

const BadgeValue = forwardRef((props: BadgeValueProps, ref: Ref<HTMLSpanElement>) => {
	const { value } = props;

	return (
		<BadgePrimitive {...props} ref={ref}>
			<span className={classnames(styles['badge-value__children'])} data-testid="badge-value">
				<StackHorizontal gap="XS" as="span" align="center">
					{value.map((item: string, idx: number) => (
						<Fragment key={`badgevalue-fragment-${item}`}>
							{idx > 0 && <Divider key={`badgevalue-divider-${item}`} orientation="vertical" />}

							<span data-testid={`badgevalue-${item}`} key={`badgevalue-value-${item}`}>
								{item}
							</span>
						</Fragment>
					))}
				</StackHorizontal>
			</span>
		</BadgePrimitive>
	);
});

BadgeValue.displayName = 'BadgeValue';

export default BadgeValue;
