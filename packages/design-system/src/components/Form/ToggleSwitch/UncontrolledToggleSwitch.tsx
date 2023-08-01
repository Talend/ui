import { Ref, forwardRef } from 'react';

import { useUncontrolled } from 'uncontrollable';

import ToggleSwitchPrimitive, {
	ToggleSwitchPrimitiveType,
} from './Primitive/ToggleSwitchPrimitive';

export type UncontrolledToggleSwitchProps = Omit<ToggleSwitchPrimitiveType, 'checked' | 'onChange'>;

const noop = () => {};

const UncontrolledToggleSwitch = forwardRef(
	(props: UncontrolledToggleSwitchProps, ref: Ref<HTMLInputElement>) => {
		const controlledProps = useUncontrolled<ToggleSwitchPrimitiveType>(
			// Typing trick : onChange is required for ToggleSwitchPrimitive but not wanted for UncontrolledToggleSwitchProps
			// So give fake onChange that will be overridden with useUncontrolled hook mecanism
			{ ...props, onChange: noop },
			{
				checked: 'onChange',
			},
		);

		return <ToggleSwitchPrimitive {...controlledProps} ref={ref} />;
	},
);

UncontrolledToggleSwitch.displayName = 'UncontrolledToggleSwitch';

export default UncontrolledToggleSwitch;
