import React, { forwardRef, ReactElement, Ref, SelectHTMLAttributes } from 'react';
import classnames from 'classnames';
import InputWrapper, { AffixesProps } from '../InputWrapper/InputWrapper';
import styles from './Select.module.scss';
import { SizedIcon } from '../../../Icon';

export type SelectPrimitiveProps = Omit<SelectHTMLAttributes<any>, 'prefix'> & {
	children: ReactElement | ReactElement[];
	hasError?: boolean;
} & AffixesProps;

const Select = forwardRef((props: SelectPrimitiveProps, ref: Ref<HTMLSelectElement>) => {
	const {
		children,
		className,
		prefix,
		suffix,
		placeholder,
		hasError,
		required,
		disabled = false,
		...rest
	} = props;
	return (
		<InputWrapper
			prefix={prefix}
			suffix={suffix}
			disabled={disabled}
			hasError={hasError}
			hasFreeHeight={true}
		>
			<div className={styles.select__wrapper}>
				<select
					{...rest}
					disabled={disabled}
					ref={ref}
					className={classnames(
						styles.select,
						{ [styles.select_multiple]: props.multiple },
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
		</InputWrapper>
	);
});

Select.displayName = 'Select';

export default Select;
