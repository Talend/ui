import { forwardRef, Ref } from 'react';

import { Mandatory } from '../../../../types';
import { CheckboxPrimitive, CheckboxPrimitiveType } from '../../Primitives';

export type CheckboxProps = Mandatory<
	Omit<CheckboxPrimitiveType, 'className' | 'style'>,
	'onChange'
>;

const Checkbox = forwardRef((props: CheckboxProps, ref: Ref<HTMLInputElement>) => {
	return <CheckboxPrimitive {...props} ref={ref} />;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
