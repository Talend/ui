import React, { forwardRef, Ref } from 'react';
import ButtonIconPrimitive, { ToggleTypes } from '../Primitive/ButtonIconPrimitive';

export type ButtonToggleType = Omit<ToggleTypes, 'variant'>;

const ButtonToggle = forwardRef((props: ButtonToggleType, ref: Ref<HTMLButtonElement>) => {
	const { children, isActive, ...rest } = props;
	return (
		<ButtonIconPrimitive {...rest} variant="toggle" ref={ref} isActive={isActive}>
			{children}
		</ButtonIconPrimitive>
	);
});

export default ButtonToggle;
