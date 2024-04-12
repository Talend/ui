import { Children, cloneElement, forwardRef } from 'react';
import type { HTMLAttributes, Ref } from 'react';
import { isElement } from 'react-is';

import classNames from 'classnames';

import styles from './Row.module.css';

type RowProps = HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean;
	readOnly?: boolean;
	isStretched?: boolean;
};

const Row = forwardRef(
	(
		{ children, disabled, readOnly, isStretched = false, ...rest }: RowProps,
		ref: Ref<HTMLDivElement>,
	) => {
		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		return (
			<div
				className={classNames(styles.row, { [styles.row_stretched]: isStretched })}
				{...rest}
				ref={ref}
			>
				{Children.toArray(children).map(child =>
					isElement(child) ? cloneElement(child, childrenProps) : child,
				)}
			</div>
		);
	},
);
Row.displayName = 'Row';
export default Row;
