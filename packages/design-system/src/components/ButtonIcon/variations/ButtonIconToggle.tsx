import React, { forwardRef, Ref } from 'react';
import ButtonIconPrimitive, { ToggleTypes } from '../Primitive/ButtonIconPrimitive';

export type ButtonToggleType = Omit<ToggleTypes, 'variant'>;

const ButtonIconToggle = forwardRef((props: ButtonToggleType, ref: Ref<HTMLButtonElement>) => {
	return <ButtonIconPrimitive {...props} variant="toggle" ref={ref} />;
});

export default ButtonIconToggle;
