import React from 'react';
import ButtonIconPrimitive, { DefaultTypes } from '../Primitive/ButtonIconPrimitive';

const ButtonIcon = React.forwardRef(
	(props: Omit<DefaultTypes, 'variant'>, ref: React.Ref<HTMLButtonElement>) => {
		const { children, ...rest } = props;
		return (
			<ButtonIconPrimitive {...rest} variant="default" ref={ref}>
				{children}
			</ButtonIconPrimitive>
		);
	},
);

export default ButtonIcon;
