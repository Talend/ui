import { forwardRef, Key, Ref } from 'react';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	InputPrimitive,
	InputPrimitiveProps,
} from '../../Primitives/index';
import { useId } from '../../../../useId';

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
		const datalistId = useId(id, 'datalist-');
		const datalistListId = useId(undefined, 'datalist__list-');

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
