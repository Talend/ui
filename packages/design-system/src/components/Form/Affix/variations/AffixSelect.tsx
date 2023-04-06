import { forwardRef, Ref } from 'react';
import { unstable_useId as useId } from 'reakit';
import FieldPrimitive, { FieldPropsPrimitive } from '../../Primitives/Field/Field';
import SelectNoWrapper, { SelectNoWrapperProps } from '../../Primitives/Select/SelectNoWrapper';

export type AffixSelectPropsType = Omit<FieldPropsPrimitive, 'hasError' | 'description'> &
	Omit<SelectNoWrapperProps, 'isAffix' | 'className' | 'style'> & {
		isSuffix: boolean;
	};

const AffixSelect = forwardRef((props: AffixSelectPropsType, ref: Ref<HTMLSelectElement>) => {
	const { label, children, name, id, isSuffix, ...rest } = props;

	function SelectAffixComponent({ affixId }: { affixId?: string }) {
		const { id: reakitId } = useId();
		const fieldID = affixId || `field--${reakitId}`;

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
