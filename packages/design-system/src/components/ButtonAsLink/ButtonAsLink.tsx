import React, { forwardRef, Ref } from 'react';

import ButtonPrimaryAsLink, {
	ButtonPrimaryAsLinkPropsType,
} from './variations/ButtonPrimaryAsLink';
import ButtonSecondaryAsLink, {
	ButtonSecondaryAsLinkPropsType,
} from './variations/ButtonSecondaryAsLink';
import ButtonTertiaryAsLink, {
	ButtonTertiaryAsLinkPropsType,
} from './variations/ButtonTertiaryAsLink';
import ButtonDestructiveAsLink, {
	ButtonDestructiveAsLinkPropsType,
} from './variations/ButtonDestructiveAsLink';
import { AvailableSizes, ButtonVariantType } from '../Button/Primitive/ButtonPrimitive';

type Primary<S extends AvailableSizes> = ButtonVariantType<
	'primary',
	ButtonPrimaryAsLinkPropsType<S>
>;
type Secondary<S extends AvailableSizes> = ButtonVariantType<
	'secondary',
	ButtonSecondaryAsLinkPropsType<S>
>;
type Tertiary<S extends AvailableSizes> = ButtonVariantType<
	'tertiary',
	ButtonTertiaryAsLinkPropsType<S>
>;
type Destructive<S extends AvailableSizes> = ButtonVariantType<
	'destructive',
	ButtonDestructiveAsLinkPropsType<S>
>;

type ButtonType<S extends AvailableSizes> =
	| Primary<S>
	| Secondary<S>
	| Tertiary<S>
	| Destructive<S>;

function ButtonPlatform<S extends AvailableSizes>(props: ButtonType<S>, ref: Ref<any>) {
	switch (props.variant) {
		case 'primary': {
			const { variant, ...rest } = props;
			return <ButtonPrimaryAsLink {...rest} ref={ref} />;
		}

		case 'destructive': {
			const { variant, ...rest } = props;
			return <ButtonDestructiveAsLink {...rest} ref={ref} />;
		}

		case 'secondary': {
			const { variant, ...rest } = props;
			return <ButtonSecondaryAsLink {...rest} ref={ref} />;
		}

		case 'tertiary': {
			const { variant, ...rest } = props;
			return <ButtonTertiaryAsLink {...rest} ref={ref} />;
		}

		default: {
			return null;
		}
	}
}

const ButtonAsLink = forwardRef(ButtonPlatform) as <S extends AvailableSizes>(
	props: ButtonType<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof ButtonPlatform>;

export default ButtonAsLink;
