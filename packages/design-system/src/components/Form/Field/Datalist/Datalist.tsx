import { forwardRef, Key, Ref, useState } from 'react';
import { randomUUID } from '@talend/utils';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	InputPrimitive,
	InputPrimitiveProps,
} from '../../Primitives/index';

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
		const [uuid] = useState<string>(randomUUID());
		const datalistId = id || `datalist--${uuid}`;
		const datalistListId = `datalist__list--${uuid}`;

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
