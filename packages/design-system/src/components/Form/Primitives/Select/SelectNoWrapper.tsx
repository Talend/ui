import React, { forwardRef, ReactElement, Ref, SelectHTMLAttributes } from 'react';
import styles from './Select.module.scss';
import classnames from 'classnames';
import { SizedIcon } from '../../../Icon';

export type SelectNoWrapperProps = Omit<SelectHTMLAttributes<any>, 'prefix'> & {
	children: ReactElement | ReactElement[];
	hasError?: boolean;
	isAffix?: boolean;
	isSuffix?: boolean;
};

const SelectNoWrapper = forwardRef((props: SelectNoWrapperProps, ref: Ref<HTMLSelectElement>) => {
	const {
		children,
		className,
		placeholder,
		hasError,
		required,
		disabled = false,
		isAffix = false,
		isSuffix = false,
		id,
		...rest
	} = props;
	return (
		<div className={styles.select__wrapper}>
			<select
				{...rest}
				disabled={disabled}
				ref={ref}
				id={id}
				className={classnames(
					styles.select,
					{ [styles.select_multiple]: props.multiple },
					{ [styles.select_isAffix]: isAffix },
					{ [styles.select_isSuffix]: isSuffix },
					className,
				)}
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
				<SizedIcon size="S" name="chevron-down" />
			</div>
		</div>
	);
});

SelectNoWrapper.displayName = 'SelectNoWrapper';

export default SelectNoWrapper;
