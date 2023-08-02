import { Ref, forwardRef } from 'react';

import { useUncontrolled } from 'uncontrollable';

import ToggleSwitchPrimitive, {
	ToggleSwitchPrimitiveType,
} from './Primitive/ToggleSwitchPrimitive';

export type UncontrolledToggleSwitchProps = Omit<ToggleSwitchPrimitiveType, 'checked'>;

const UncontrolledToggleSwitch = forwardRef(
	(props: UncontrolledToggleSwitchProps, ref: Ref<HTMLInputElement>) => {
		const controlledProps = useUncontrolled<ToggleSwitchPrimitiveType>(props, {
			checked: 'onChange',
		});

		return <ToggleSwitchPrimitive {...controlledProps} ref={ref} />;
	},
);

UncontrolledToggleSwitch.displayName = 'UncontrolledToggleSwitch';

export default UncontrolledToggleSwitch;
