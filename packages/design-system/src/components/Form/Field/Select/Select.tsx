import { forwardRef, Children } from 'react';
import type { Ref } from 'react';
import { isElement } from 'react-is';
import Input from '../Input';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	SelectPrimitive,
	SelectPrimitiveProps,
} from '../../Primitives/index';

export type SelectProps = FieldPropsPrimitive &
	Omit<SelectPrimitiveProps, 'className' | 'style' | 'isAffix'> & { readOnly?: boolean };

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
				id={id}
				name={name}
				hideLabel={hideLabel}
				required={required}
				ref={ref as Ref<HTMLInputElement>}
			/>
		);
	}

	function SelectField(fieldProps: Omit<SelectProps, 'hasError' | 'name' | 'children' | 'label'>) {
		return (
			<SelectPrimitive
				hasError={hasError || false}
				{...fieldProps}
				ref={ref as Ref<HTMLSelectElement>}
			>
				{children}
			</SelectPrimitive>
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
			hideLabel={hideLabel}
			required={required}
		>
			<SelectField defaultValue={defaultValue} {...rest} />
		</FieldPrimitive>
	);
});

Select.displayName = 'Select';

export default Select;
