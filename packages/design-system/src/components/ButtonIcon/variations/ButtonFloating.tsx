import React from 'react';
import ButtonIconPrimitive, { FloatingTypes } from '../Primitive/ButtonIconPrimitive';

const ButtonFloating = React.forwardRef(
	(props: Omit<FloatingTypes, 'variant'>, ref: React.Ref<HTMLButtonElement>) => {
		const { children, ...rest } = props;
		return (
			<ButtonIconPrimitive {...rest} variant="floating" ref={ref}>
				{children}
			</ButtonIconPrimitive>
		);
	},
);

export default ButtonFloating;
