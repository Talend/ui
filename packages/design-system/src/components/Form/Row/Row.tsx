import { forwardRef, Children, cloneElement } from 'react';
import type { Ref, HTMLAttributes } from 'react';
import { isElement } from 'react-is';

import styles from './Row.module.scss';
import classNames from 'classnames';

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

export default Row;
