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
import { availableVariants } from '../Button/Primitive/ButtonPrimitive';
import Linkable from '../Linkable';

type Primary = { variant: typeof availableVariants.primary } & ButtonPrimaryAsLinkPropsType;
type Secondary = { variant: typeof availableVariants.secondary } & ButtonSecondaryAsLinkPropsType;
type Tertiary = { variant: typeof availableVariants.tertiary } & ButtonTertiaryAsLinkPropsType;
type Destructive = {
	variant: typeof availableVariants.destructive;
} & ButtonDestructiveAsLinkPropsType;

type ButtonType = Primary | Secondary | Tertiary | Destructive;

const ButtonAsLink = forwardRef((props: ButtonType, ref: Ref<any>) => {
	switch (props.variant) {
		case availableVariants.primary: {
			const { variant, ...rest } = props;
			return <ButtonPrimaryAsLink {...rest} ref={ref} />;
		}

		case availableVariants.destructive: {
			const { variant, ...rest } = props;
			return <ButtonDestructiveAsLink {...rest} ref={ref} />;
		}

		case availableVariants.secondary: {
			const { variant, ...rest } = props;
			return <ButtonSecondaryAsLink {...rest} ref={ref} />;
		}

		case availableVariants.tertiary: {
			const { variant, ...rest } = props;
			return <ButtonTertiaryAsLink {...rest} ref={ref} />;
		}

		default: {
			return <Linkable {...props} ref={ref} />;
		}
	}
});

export default ButtonAsLink;
