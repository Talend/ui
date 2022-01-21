import React, { forwardRef, Ref } from 'react';
import ButtonIconPrimitive, { DefaultTypes } from '../Primitive/ButtonIconPrimitive';

export type ButtonIconType = Omit<DefaultTypes, 'variant'>;

const ButtonIcon = forwardRef((props: ButtonIconType, ref: Ref<HTMLButtonElement>) => {
	return <ButtonIconPrimitive {...props} variant="default" ref={ref} />;
});

export default ButtonIcon;
