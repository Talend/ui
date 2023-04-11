import * as React from 'react';
import { isElement } from 'react-is';

import styles from './Row.module.scss';
import classNames from 'classnames';

type RowProps = React.HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean;
	readOnly?: boolean;
	isStretched?: boolean;
};

const Row = React.forwardRef(
	(
		{ children, disabled, readOnly, isStretched = false, ...rest }: RowProps,
		ref: React.Ref<HTMLDivElement>,
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
				{React.Children.toArray(children).map(child =>
					isElement(child) ? React.cloneElement(child, childrenProps) : child,
				)}
			</div>
		);
	},
);

export default Row;
