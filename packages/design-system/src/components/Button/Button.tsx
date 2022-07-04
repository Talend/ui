import React, { forwardRef, Ref } from 'react';

import ButtonPrimary, { ButtonPrimaryPropsType } from './variations/ButtonPrimary';
import ButtonSecondary, { ButtonSecondaryPropsType } from './variations/ButtonSecondary';
import ButtonTertiary, { ButtonTertiaryPropsType } from './variations/ButtonTertiary';
import ButtonDestructive, { ButtonDestructivePropsType } from './variations/ButtonDestructive';
import { AvailableSizes, ButtonVariantType } from './Primitive/ButtonPrimitive';

type Primary<S extends AvailableSizes> = ButtonVariantType<'primary', ButtonPrimaryPropsType<S>>;
type Secondary<S extends AvailableSizes> = ButtonVariantType<
	'secondary',
	ButtonSecondaryPropsType<S>
>;
type Tertiary<S extends AvailableSizes> = ButtonVariantType<'tertiary', ButtonTertiaryPropsType<S>>;
type Destructive<S extends AvailableSizes> = ButtonVariantType<
	'destructive',
	ButtonDestructivePropsType<S>
>;

type ButtonType<S extends AvailableSizes> =
	| Primary<S>
	| Secondary<S>
	| Tertiary<S>
	| Destructive<S>;

function ButtonPlatform<S extends AvailableSizes>(
	props: ButtonType<S>,
	ref: Ref<HTMLButtonElement>,
) {
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
			return null;
		}
	}
}

const Button = forwardRef(ButtonPlatform) as <S extends AvailableSizes>(
	props: ButtonType<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof ButtonPlatform>;

export default Button;
