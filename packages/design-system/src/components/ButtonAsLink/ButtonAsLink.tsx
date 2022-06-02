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
import { ButtonVariantType } from '../Button/Primitive/ButtonPrimitive';

type Primary = ButtonVariantType<'primary', ButtonPrimaryAsLinkPropsType>;
type Secondary = ButtonVariantType<'secondary', ButtonSecondaryAsLinkPropsType>;
type Tertiary = ButtonVariantType<'tertiary', ButtonTertiaryAsLinkPropsType>;
type Destructive = ButtonVariantType<'destructive', ButtonDestructiveAsLinkPropsType>;

type ButtonType = Primary | Secondary | Tertiary | Destructive;

const ButtonAsLink = forwardRef((props: ButtonType, ref: Ref<any>) => {
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
});

export default ButtonAsLink;
