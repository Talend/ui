import { Ref, forwardRef } from 'react';

import { useUncontrolled } from 'uncontrollable';

import CheckboxPrimitive, { CheckboxPrimitiveType } from './Primitive/CheckboxPrimitive';

export type UncontrolledCheckboxProps = Omit<CheckboxPrimitiveType, 'checked' | 'onChange'>;

const noop = () => {};

const UncontrolledCheckbox = forwardRef(
	(props: UncontrolledCheckboxProps, ref: Ref<HTMLInputElement>) => {
		const controlledProps = useUncontrolled<CheckboxPrimitiveType>(
			// Typing trick : onChange is required for CheckboxPrimitive but not wanted for UncontrolledCheckboxProps
			// So give fake onChange that will be overridden with useUncontrolled hook mecanism
			{ ...props, onChange: noop },
			{
				checked: 'onChange',
			},
		);

		return <CheckboxPrimitive {...controlledProps} ref={ref} />;
	},
);

UncontrolledCheckbox.displayName = 'UncontrolledCheckbox';

export default UncontrolledCheckbox;
