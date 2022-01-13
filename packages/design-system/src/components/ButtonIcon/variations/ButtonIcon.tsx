import React, { forwardRef, Ref } from 'react';
import ButtonIconPrimitive, { DefaultTypes } from '../Primitive/ButtonIconPrimitive';

export type ButtonIconType = Omit<DefaultTypes, 'variant'>;

const ButtonIcon = forwardRef((props: ButtonIconType, ref: Ref<HTMLButtonElement>) => {
	const { children, ...rest } = props;
	return (
		<ButtonIconPrimitive {...rest} variant="default" ref={ref}>
			{children}
		</ButtonIconPrimitive>
	);
});

export default ButtonIcon;
