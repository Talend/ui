import { forwardRef, Ref, useState } from 'react';
import { randomUUID } from '@talend/utils';
import FieldPrimitive, { FieldPropsPrimitive } from '../../Primitives/Field/Field';
import SelectNoWrapper, { SelectNoWrapperProps } from '../../Primitives/Select/SelectNoWrapper';

export type AffixSelectPropsType = Omit<FieldPropsPrimitive, 'hasError' | 'description'> &
	Omit<SelectNoWrapperProps, 'isAffix' | 'className' | 'style'> & {
		isSuffix: boolean;
	};

const AffixSelect = forwardRef((props: AffixSelectPropsType, ref: Ref<HTMLSelectElement>) => {
	const { label, children, name, id, isSuffix, ...rest } = props;

	function SelectAffixComponent({ affixId }: { affixId?: string }) {
		const [uuid] = useState<string>(randomUUID());
		const fieldID = affixId || `field--${uuid}`;

		function AffixSelectComponent(
			selectProps: Omit<SelectNoWrapperProps, 'hasError' | 'name' | 'children' | 'label'>,
		) {
			return (
				<SelectNoWrapper id={fieldID} {...selectProps} isAffix isSuffix={isSuffix} ref={ref}>
					{children}
				</SelectNoWrapper>
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
