import React, { forwardRef, Ref } from 'react';
import ButtonIconPrimitive, { FloatingTypes } from '../Primitive/ButtonIconPrimitive';

export type ButtonFloatingType = Omit<FloatingTypes, 'variant'>;

const ButtonFloating = forwardRef((props: ButtonFloatingType, ref: Ref<HTMLButtonElement>) => {
	const { children, ...rest } = props;
	return (
		<ButtonIconPrimitive {...rest} variant="floating" ref={ref}>
			{children}
		</ButtonIconPrimitive>
	);
});

export default ButtonFloating;
