import { forwardRef, Ref } from 'react';

import { CheckboxPrimitive, CheckboxPrimitiveType } from '../../Primitives';

export type CheckboxProps = Omit<CheckboxPrimitiveType, 'className' | 'style'>;

const Checkbox = forwardRef((props: CheckboxProps, ref: Ref<HTMLInputElement>) => {
	return <CheckboxPrimitive {...props} ref={ref} />;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
