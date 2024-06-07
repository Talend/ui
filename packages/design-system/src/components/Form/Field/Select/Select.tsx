import { Children, forwardRef } from 'react';
import type { Ref } from 'react';
import { isElement } from 'react-is';

import { useId } from '../../../../useId';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	SelectPrimitive,
	SelectPrimitiveProps,
} from '../../Primitives';
import Input from '../Input';

export type SelectProps = FieldPropsPrimitive &
	Omit<SelectPrimitiveProps, 'className' | 'style' | 'isAffix'> & { readOnly?: boolean };

const SelectField = forwardRef((fieldProps: SelectProps, ref: Ref<HTMLSelectElement>) => {
	return <SelectPrimitive {...fieldProps} ref={ref} />;
});

SelectField.displayName = 'SelectField';

const Select = forwardRef((props: SelectProps, ref: Ref<HTMLSelectElement | HTMLInputElement>) => {
	const {
		label,
		hasError = false,
		link,
		description,
		id,
		name,
		hideLabel,
		readOnly,
		required,
		children,
		defaultValue,
		...rest
	} = props;

	const fieldID = useId(id, 'field-');

	if (readOnly) {
		const values = Children.toArray(children).reduce((acc: string[], current) => {
			if (!isElement(current)) {
				return acc.concat(current.toString());
			}
			const { children: optChildren, selected } = current.props;
			if (current.type === 'optgroup') {
				return acc.concat(
					Children.toArray(optChildren)
						.filter(option => isElement(option) && option.props.selected)
						.map(option => isElement(option) && option.props.children),
				);
			}
			if (selected) {
				return acc.concat(optChildren);
			}
			return acc;
		}, []);
		const displayedValues = values.length > 0 ? values.join('; ') : undefined;
		return (
			<Input
				{...rest}
				readOnly
				value={displayedValues}
				defaultValue={defaultValue}
				label={label}
				hasError={hasError || false}
				link={link}
				description={description}
				id={fieldID}
				name={name}
				hideLabel={hideLabel}
				required={required}
				ref={ref as Ref<HTMLInputElement>}
			/>
		);
	}

	return (
		<FieldPrimitive
			label={label}
			hasError={hasError || false}
			link={link}
			description={description}
			id={id}
			name={name}
			fieldId={fieldID}
			hideLabel={hideLabel}
			required={required}
		>
			<SelectField
				defaultValue={defaultValue}
				hasError={hasError || false}
				name={name}
				required={required}
				label={label}
				id={fieldID}
				{...rest}
			>
				{children}
			</SelectField>
		</FieldPrimitive>
	);
});

Select.displayName = 'Select';

export default Select;
