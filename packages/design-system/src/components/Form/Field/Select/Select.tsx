import React, { forwardRef, Ref } from 'react';
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

const Select = forwardRef(
	(props: SelectProps, ref: React.Ref<HTMLSelectElement | HTMLInputElement>) => {
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
			...rest
		} = props;

		if (readOnly) {
			const values = React.Children.toArray(children).reduce((acc: string[], current) => {
				if (!isElement(current)) {
					return acc.concat(current.toString());
				}
				const { children: optChildren, originalType, selected } = current.props;
				if (originalType === 'optgroup') {
					return acc.concat(
						React.Children.toArray(optChildren)
							.filter(option => isElement(option) && option.props.selected)
							.map(option => isElement(option) && option.props.children),
					);
				}
				if (selected) {
					return acc.concat(optChildren);
				}
				return acc;
			}, []);
			return (
				<Input
					{...rest}
					readOnly
					value={values.join('; ')}
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

		function SelectField(
			fieldProps: Omit<SelectProps, 'hasError' | 'name' | 'children' | 'label'>,
		) {
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
				<SelectField {...rest} />
			</FieldPrimitive>
		);
	},
);

export default Select;
