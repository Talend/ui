import React from 'react';
import { isElement } from 'react-is';

import styles from './Row.module.scss';

type RowProps = React.HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean;
	readOnly?: boolean;
};

const Row = React.forwardRef(
	({ children, disabled, readOnly, ...rest }: RowProps, ref: React.Ref<HTMLDivElement>) => {
		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		return (
			<div className={styles.row} {...rest} ref={ref}>
				{React.Children.toArray(children).map(child =>
					isElement(child) ? React.cloneElement(child, childrenProps) : child,
				)}
			</div>
		);
	},
);

export default Row;
