import React from 'react';
import ButtonIcon from './variations/ButtonIcon';
import ButtonToggle from './variations/ButtonToggle';
import ButtonFloating from './variations/ButtonFloating';
import { ButtonIconProps } from './Primitive/ButtonIconPrimitive';

const ButtonIconVariant = React.forwardRef(
	(props: ButtonIconProps, ref: React.Ref<HTMLButtonElement>) => {
		switch (props.variant) {
			case 'toggle': {
				const { children, variant, ...rest } = props;
				return (
					<ButtonToggle {...rest} ref={ref}>
						{children}
					</ButtonToggle>
				);
			}

			case 'floating': {
				const { children, variant, ...rest } = props;
				return (
					<ButtonFloating {...rest} ref={ref}>
						{children}
					</ButtonFloating>
				);
			}

			default: {
				const { children, variant, ...rest } = props;
				return (
					<ButtonIcon {...rest} ref={ref}>
						{children}
					</ButtonIcon>
				);
			}
		}
	},
);

export default ButtonIconVariant;
