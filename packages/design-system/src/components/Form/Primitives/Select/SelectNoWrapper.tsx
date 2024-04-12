import { forwardRef, ReactElement, Ref, SelectHTMLAttributes } from 'react';

import classnames from 'classnames';

import { SizedIcon } from '../../../Icon';
import styles from './Select.module.css';

export type SelectNoWrapperProps = Omit<SelectHTMLAttributes<any>, 'prefix'> & {
	children: ReactElement | ReactElement[];
	placeholder?: string;
	hasError?: boolean;
	isAffix?: boolean;
	isSuffix?: boolean;
	dataTestid?: string;
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
		dataTestid,
		...rest
	} = props;
	return (
		<div className={styles.select__wrapper}>
			<select
				{...rest}
				data-testid={dataTestid}
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
