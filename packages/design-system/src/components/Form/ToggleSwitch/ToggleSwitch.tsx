import { forwardRef, Ref } from 'react';

import { Mandatory } from '../../../types';
import ToggleSwitchPrimitive, {
	ToggleSwitchPrimitiveType,
} from './Primitive/ToggleSwitchPrimitive';

export type ToggleSwitchProps = Mandatory<
	Omit<ToggleSwitchPrimitiveType, 'className' | 'style'>,
	'onChange'
>;

const ToggleSwitch = forwardRef((props: ToggleSwitchProps, ref: Ref<HTMLInputElement>) => {
	return <ToggleSwitchPrimitive {...props} ref={ref} />;
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
