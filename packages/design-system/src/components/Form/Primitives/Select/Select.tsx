import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import classnames from 'classnames';

type SelectProps = HTMLAttributes<HTMLSelectElement> & {
	children: HTMLOptionElement[];
};

import styles from './Select.module.scss';

const Select = forwardRef((props: SelectProps, ref: Ref<HTMLSelectElement>) => {
	const { children, className, ...rest } = props;
	return (
		<select {...props} ref={ref} className={classnames(styles.select, className)}>
			{children}
		</select>
	);
});

Select.displayName = 'Select';

export default Select;
