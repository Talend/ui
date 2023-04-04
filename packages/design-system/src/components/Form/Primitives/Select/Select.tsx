import { forwardRef, ReactElement, Ref, SelectHTMLAttributes } from 'react';
import InputWrapper, { AffixesProps } from '../InputWrapper/InputWrapper';
import SelectNoWrapper from './SelectNoWrapper';

export type SelectPrimitiveProps = Omit<SelectHTMLAttributes<any>, 'prefix'> & {
	children: ReactElement | ReactElement[];
	hasError?: boolean;
	isAffix?: boolean;
	isSuffix?: boolean;
} & AffixesProps;

const Select = forwardRef((props: SelectPrimitiveProps, ref: Ref<HTMLSelectElement>) => {
	const {
		children,
		className,
		placeholder,
		hasError,
		required,
		disabled = false,
		isAffix = false,
		isSuffix = false,
		prefix,
		suffix,
		id,
		...rest
	} = props;
	return (
		<InputWrapper
			prefix={prefix}
			suffix={suffix}
			disabled={disabled}
			hasError={hasError}
			hasFreeHeight={rest.multiple}
			noStyles={isAffix}
		>
			<SelectNoWrapper
				{...rest}
				disabled={disabled}
				ref={ref}
				id={id}
				isAffix={isAffix}
				isSuffix={isSuffix}
				className={className}
				placeholder={placeholder}
				required={required}
			>
				{children}
			</SelectNoWrapper>
		</InputWrapper>
	);
});

Select.displayName = 'Select';

export default Select;
