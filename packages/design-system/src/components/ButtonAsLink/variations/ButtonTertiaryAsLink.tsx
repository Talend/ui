import React, { forwardRef, Ref } from 'react';
import ButtonPrimitiveAsLink, { BaseButtonPropsAsLink } from '../Primitive/ButtonPrimitiveAsLink';
import { AvailableSizes } from '../../Button/Primitive/ButtonPrimitive';

import styles from '../../Button/variations/ButtonTertiary.module.scss';

export type ButtonTertiaryAsLinkPropsType<S extends AvailableSizes> = Omit<
	BaseButtonPropsAsLink<S>,
	'className'
>;

function TertiaryAsLink<S extends AvailableSizes>(
	props: ButtonTertiaryAsLinkPropsType<S>,
	ref: Ref<HTMLAnchorElement>,
) {
	return <ButtonPrimitiveAsLink {...props} ref={ref} className={styles.tertiary} />;
}

const ButtonTertiaryAsLink = forwardRef(TertiaryAsLink) as <S extends AvailableSizes>(
	props: ButtonTertiaryAsLinkPropsType<S> & { ref?: Ref<HTMLAnchorElement> },
) => ReturnType<typeof TertiaryAsLink>;

export default ButtonTertiaryAsLink;
