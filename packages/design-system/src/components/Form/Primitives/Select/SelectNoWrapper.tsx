import { forwardRef, ReactElement, Ref, SelectHTMLAttributes } from 'react';

import classnames from 'classnames';

import { SizedIcon } from '../../../Icon';

import styles from './Select.module.scss';

export type SelectNoWrapperProps = Omit<SelectHTMLAttributes<any>, 'prefix'> & {
	children: ReactElement | ReactElement[];
	placeholder?: string;
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
				required={required}
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
