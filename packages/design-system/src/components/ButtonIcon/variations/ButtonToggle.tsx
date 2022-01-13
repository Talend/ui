import React from 'react';
import ButtonIconPrimitive, { ToggleTypes } from '../Primitive/ButtonIconPrimitive';

const ButtonToggle = React.forwardRef(
	(props: Omit<ToggleTypes, 'variant'>, ref: React.Ref<HTMLButtonElement>) => {
		const { children, ...rest } = props;
		return (
			<ButtonIconPrimitive {...rest} variant="toggle" ref={ref}>
				{children}
			</ButtonIconPrimitive>
		);
	},
);

export default ButtonToggle;
