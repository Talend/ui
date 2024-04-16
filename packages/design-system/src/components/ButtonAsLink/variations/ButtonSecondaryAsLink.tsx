import { forwardRef, Ref } from 'react';

import { AvailableSizes } from '../../Button/Primitive/ButtonPrimitive';
import styles from '../../Button/variations/ButtonSecondary.module.css';
import ButtonPrimitiveAsLink, { BaseButtonPropsAsLink } from '../Primitive/ButtonPrimitiveAsLink';

export type ButtonSecondaryAsLinkPropsType<S extends AvailableSizes> = Omit<
	BaseButtonPropsAsLink<S>,
	'className'
>;

function SecondaryAsLink<S extends AvailableSizes>(
	props: ButtonSecondaryAsLinkPropsType<S>,
	ref: Ref<HTMLAnchorElement>,
) {
	return <ButtonPrimitiveAsLink {...props} ref={ref} className={styles.secondary} />;
}
const ButtonSecondaryAsLink = forwardRef(SecondaryAsLink) as <S extends AvailableSizes>(
	props: ButtonSecondaryAsLinkPropsType<S> & { ref?: Ref<HTMLAnchorElement> },
) => ReturnType<typeof SecondaryAsLink>;

export default ButtonSecondaryAsLink;
