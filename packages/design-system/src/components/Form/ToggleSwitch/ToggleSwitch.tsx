import { forwardRef, Ref } from 'react';

import ToggleSwitchPrimitive, {
	ToggleSwitchPrimitiveType,
} from './Primitive/ToggleSwitchPrimitive';

export type ToggleSwitchProps = Omit<ToggleSwitchPrimitiveType, 'className' | 'style'>;

const ToggleSwitch = forwardRef((props: ToggleSwitchProps, ref: Ref<HTMLInputElement>) => {
	return <ToggleSwitchPrimitive {...props} ref={ref} />;
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
