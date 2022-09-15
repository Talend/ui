import React, { forwardRef, Key, Ref } from 'react';
import { unstable_useId as useId } from 'reakit';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	InputPrimitive,
	InputPrimitiveProps,
} from '../../FormPrimitives/index';

export type DatalistProps = {
	values: string[];
	value?: string;
	defaultValue?: string;
	disabled?: boolean;
	readOnly?: boolean;
} & FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'type' | 'className' | 'style'>;

const Datalist = forwardRef(
	(
		{
			id,
			values = [],
			value,
			defaultValue,
			disabled,
			readOnly,
			label,
			hasError = false,
			link,
			description,
			name,
			hideLabel,
			required,
			...rest
		}: DatalistProps,
		ref: Ref<HTMLInputElement> | undefined,
	) => {
		const { id: reakitId } = useId();
		const datalistId = id || `datalist--${reakitId}`;
		const datalistListId = `datalist__list--${reakitId}`;

		return (
			<>
				<FieldPrimitive
					id={datalistId}
					label={label}
					hasError={hasError || false}
					link={link}
					description={description}
					name={name}
					hideLabel={hideLabel}
					required={required}
				>
					<InputPrimitive
						{...rest}
						list={datalistListId}
						disabled={!!disabled}
						readOnly={!!readOnly}
						value={value}
						defaultValue={defaultValue}
						type="datalist"
						ref={ref}
					/>
				</FieldPrimitive>
				<datalist id={datalistListId}>
					{values.map((currValue: string, index: Key) => (
						<option key={index} value={currValue} />
					))}
				</datalist>
			</>
		);
	},
);

Datalist.displayName = 'Datalist';

export default Datalist;
