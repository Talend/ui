import { forwardRef, Ref } from 'react';

import { DataAttributes } from 'src/types';

import { useId } from '../../../../useId';
import FieldPrimitive, { FieldPropsPrimitive } from '../../Primitives/Field/Field';
import SelectNoWrapper, { SelectNoWrapperProps } from '../../Primitives/Select/SelectNoWrapper';

export type AffixSelectPropsType = Omit<FieldPropsPrimitive, 'hasError' | 'description'> &
	Omit<SelectNoWrapperProps, 'isAffix' | 'className' | 'style'> & {
		isSuffix: boolean;
	} & Partial<DataAttributes>;

const AffixSelect = forwardRef((props: AffixSelectPropsType, ref: Ref<HTMLSelectElement>) => {
	const { label, children, name, id, isSuffix, ...rest } = props;

	function SelectAffixComponent({ affixId }: { affixId?: string }) {
		const fieldID = useId(affixId, 'field-');

		function AffixSelectComponent(
			selectProps: Omit<SelectNoWrapperProps, 'hasError' | 'children' | 'label'>,
		) {
			return (
				<SelectNoWrapper id={fieldID} {...selectProps} isAffix isSuffix={isSuffix} ref={ref}>
					{children}
				</SelectNoWrapper>
			);
		}
		return (
			<FieldPrimitive label={label} name={name} id={fieldID} fieldId={fieldID} hideLabel>
				<AffixSelectComponent name={name} {...rest} />
			</FieldPrimitive>
		);
	}

	return <SelectAffixComponent affixId={id} />;
});

AffixSelect.displayName = 'AffixSelect';

export default AffixSelect;
