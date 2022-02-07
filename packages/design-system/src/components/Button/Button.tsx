import React, { forwardRef, Ref } from 'react';

import ButtonPrimary, { ButtonPrimaryPropsType } from './variations/ButtonPrimary';
import ButtonSecondary, { ButtonSecondaryPropsType } from './variations/ButtonSecondary';
import ButtonTertiary, { ButtonTertiaryPropsType } from './variations/ButtonTertiary';
import ButtonDestructive, { ButtonDestructivePropsType } from './variations/ButtonDestructive';
import { availableVariants } from './Primitive/ButtonPrimitive';
import Clickable from '../Clickable';

type Primary = { variant: typeof availableVariants.primary } & ButtonPrimaryPropsType;
type Secondary = { variant: typeof availableVariants.secondary } & ButtonSecondaryPropsType;
type Tertiary = { variant: typeof availableVariants.tertiary } & ButtonTertiaryPropsType;
type Destructive = { variant: typeof availableVariants.destructive } & ButtonDestructivePropsType;

type ButtonType = Primary | Secondary | Tertiary | Destructive;

const Button = forwardRef((props: ButtonType, ref: Ref<HTMLButtonElement>) => {
	switch (props.variant) {
		case availableVariants.primary: {
			const { variant, ...rest } = props;
			return <ButtonPrimary {...rest} ref={ref} />;
		}

		case availableVariants.destructive: {
			const { variant, ...rest } = props;
			return <ButtonDestructive {...rest} ref={ref} />;
		}

		case availableVariants.secondary: {
			const { variant, ...rest } = props;
			return <ButtonSecondary {...rest} ref={ref} />;
		}

		case availableVariants.tertiary: {
			const { variant, ...rest } = props;
			return <ButtonTertiary {...rest} ref={ref} />;
		}

		default: {
			return <Clickable {...props} ref={ref} />;
		}
	}
});

export default Button;
