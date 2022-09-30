import React, { forwardRef, Ref } from 'react';
import { FieldPrimitive, FieldPropsPrimitive, SelectPrimitiveProps } from '../../Primitives/index';
import { unstable_useId as useId } from 'reakit';
import Select from '../../Primitives/Select/Select';
import { SelectProps } from '../../Field/Select/Select';

export type AffixSelectPropsType = Omit<FieldPropsPrimitive, 'hasError' | 'description'> &
	Omit<SelectPrimitiveProps, 'prefix' | 'suffix' | 'isAffix' | 'className' | 'style'>;

const AffixSelect = forwardRef((props: AffixSelectPropsType, ref: Ref<HTMLSelectElement>) => {
	const { label, children, name, id, ...rest } = props;

	function SelectAffixComponent({ affixId }: { affixId?: string }) {
		const { id: reakitId } = useId();
		const fieldID = affixId || `field--${reakitId}`;

		function AffixSelectComponent(
			selectProps: Omit<SelectProps, 'hasError' | 'name' | 'children' | 'label'>,
		) {
			return (
				<Select id={fieldID} {...selectProps} isAffix ref={ref}>
					{children}
				</Select>
			);
		}
		return (
			<FieldPrimitive label={label} name={name} id={fieldID} hideLabel>
				<AffixSelectComponent {...rest} />
			</FieldPrimitive>
		);
	}

	return <SelectAffixComponent affixId={id} />;
});

AffixSelect.displayName = 'AffixSelect';

export default AffixSelect;
