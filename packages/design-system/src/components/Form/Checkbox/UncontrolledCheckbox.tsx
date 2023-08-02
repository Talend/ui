import { Ref, forwardRef } from 'react';

import { useUncontrolled } from 'uncontrollable';

import CheckboxPrimitive, { CheckboxPrimitiveType } from './Primitive/CheckboxPrimitive';

export type UncontrolledCheckboxProps = Omit<CheckboxPrimitiveType, 'checked'>;

const UncontrolledCheckbox = forwardRef(
	(props: UncontrolledCheckboxProps, ref: Ref<HTMLInputElement>) => {
		const controlledProps = useUncontrolled<CheckboxPrimitiveType>(props, {
			checked: 'onChange',
		});

		return <CheckboxPrimitive {...controlledProps} ref={ref} />;
	},
);

UncontrolledCheckbox.displayName = 'UncontrolledCheckbox';

export default UncontrolledCheckbox;
