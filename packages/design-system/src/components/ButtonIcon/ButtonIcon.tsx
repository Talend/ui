import React from 'react';
import ButtonIconDefault from './variations/ButtonIconDefault';
import ButtonIconToggle from './variations/ButtonIconToggle';
import ButtonIconFloating from './variations/ButtonIconFloating';
import {
	ButtonIconProps,
	DefaultTypes,
	FloatingTypes,
	PossibleVariants,
	ToggleTypes,
} from './Primitive/ButtonIconPrimitive';

type ButtonIconDefaultProps = Omit<ButtonIconProps, 'variant'> & {
	variant?: PossibleVariants;
};

const ButtonIcon = React.forwardRef(
	(props: ButtonIconDefaultProps, ref: React.Ref<HTMLButtonElement>) => {
		switch (props.variant) {
			case 'toggle': {
				const { children, variant, ...rest } = props as ToggleTypes;
				return (
					<ButtonIconToggle {...rest} ref={ref}>
						{children}
					</ButtonIconToggle>
				);
			}

			case 'floating': {
				const { children, variant, ...rest } = props as FloatingTypes;
				return (
					<ButtonIconFloating {...rest} ref={ref}>
						{children}
					</ButtonIconFloating>
				);
			}

			default: {
				const { children, variant, ...rest } = props as DefaultTypes;
				return (
					<ButtonIconDefault {...rest} ref={ref}>
						{children}
					</ButtonIconDefault>
				);
			}
		}
	},
);

export default ButtonIcon;
