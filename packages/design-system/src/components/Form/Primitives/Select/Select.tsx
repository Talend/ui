import React, { forwardRef, ReactElement, Ref, SelectHTMLAttributes } from 'react';
import classnames from 'classnames';
import InputWrapper, { AffixesProps } from '../InputWrapper/InputWrapper';

type SelectProps = Omit<SelectHTMLAttributes<any>, 'prefix'> & {
	children: ReactElement[];
	readOnly?: boolean;
} & AffixesProps;

import styles from './Select.module.scss';
import { Icon } from '../../../Icon/Icon';

const Select = forwardRef((props: SelectProps, ref: Ref<HTMLSelectElement>) => {
	const {
		children,
		className,
		prefix,
		suffix,
		placeholder,
		required,
		readOnly = false,
		disabled = false,
		...rest
	} = props;
	return (
		<InputWrapper prefix={prefix} suffix={suffix} readOnly={!!readOnly} disabled={!!disabled}>
			<div className={styles.select__wrapper}>
				<select
					{...rest}
					disabled={disabled || readOnly}
					ref={ref}
					className={classnames(styles.select, { [styles.select_readOnly]: readOnly }, className)}
				>
					{placeholder && (
						<option disabled selected>
							{placeholder}
						</option>
					)}
					{!required && <option value=""></option>}
					{children}
				</select>
				<div className={styles.select__icon}>
					<Icon name="talend-caret-down" />
				</div>
			</div>
		</InputWrapper>
	);
});

Select.displayName = 'Select';

export default Select;
