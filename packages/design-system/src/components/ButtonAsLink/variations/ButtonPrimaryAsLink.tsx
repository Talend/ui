import { forwardRef, Ref } from 'react';
import ButtonPrimitiveAsLink, { BaseButtonPropsAsLink } from '../Primitive/ButtonPrimitiveAsLink';
import { AvailableSizes } from '../../Button/Primitive/ButtonPrimitive';

import styles from '../../Button/variations/ButtonPrimary.module.scss';

export type ButtonPrimaryAsLinkPropsType<S extends AvailableSizes> = Omit<
	BaseButtonPropsAsLink<S>,
	'className'
>;

function PrimaryAsLink<S extends AvailableSizes>(
	props: ButtonPrimaryAsLinkPropsType<S>,
	ref: Ref<HTMLAnchorElement>,
) {
	return <ButtonPrimitiveAsLink {...props} ref={ref} className={styles.primary} />;
}

const ButtonPrimaryAsLink = forwardRef(PrimaryAsLink) as <S extends AvailableSizes>(
	props: ButtonPrimaryAsLinkPropsType<S> & { ref?: Ref<HTMLAnchorElement> },
) => ReturnType<typeof PrimaryAsLink>;

export default ButtonPrimaryAsLink;
