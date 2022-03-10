import React, { forwardRef, Ref } from 'react';

import ButtonPrimary, { ButtonPrimaryPropsType } from './variations/ButtonPrimary';
import ButtonSecondary, { ButtonSecondaryPropsType } from './variations/ButtonSecondary';
import ButtonTertiary, { ButtonTertiaryPropsType } from './variations/ButtonTertiary';
import ButtonDestructive, { ButtonDestructivePropsType } from './variations/ButtonDestructive';
import Clickable from '../Clickable';
import { ButtonVariantType } from './Primitive/ButtonPrimitive';

type Primary = ButtonVariantType<'primary', ButtonPrimaryPropsType>;
type Secondary = ButtonVariantType<'secondary', ButtonSecondaryPropsType>;
type Tertiary = ButtonVariantType<'tertiary', ButtonTertiaryPropsType>;
type Destructive = ButtonVariantType<'destructive', ButtonDestructivePropsType>;

type ButtonType = Primary | Secondary | Tertiary | Destructive;

const Button = forwardRef((props: ButtonType, ref: Ref<HTMLButtonElement>) => {
	switch (props.variant) {
		case 'primary': {
			const { variant, ...rest } = props;
			return <ButtonPrimary {...rest} ref={ref} />;
		}

		case 'destructive': {
			const { variant, ...rest } = props;
			return <ButtonDestructive {...rest} ref={ref} />;
		}

		case 'secondary': {
			const { variant, ...rest } = props;
			return <ButtonSecondary {...rest} ref={ref} />;
		}

		case 'tertiary': {
			const { variant, ...rest } = props;
			return <ButtonTertiary {...rest} ref={ref} />;
		}

		default: {
			return <Clickable {...props} ref={ref} />;
		}
	}
});

export default Button;
