import React, { forwardRef, Ref } from 'react';
import ButtonIconPrimitive, { FloatingTypes } from '../Primitive/ButtonIconPrimitive';

export type ButtonFloatingType = Omit<FloatingTypes, 'variant'>;

const ButtonIconFloating = forwardRef((props: ButtonFloatingType, ref: Ref<HTMLButtonElement>) => {
	return <ButtonIconPrimitive {...props} variant="floating" ref={ref} />;
});

export default ButtonIconFloating;
