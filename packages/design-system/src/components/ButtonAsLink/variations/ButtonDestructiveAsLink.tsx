import { forwardRef, Ref } from 'react';

import { AvailableSizes } from '../../Button/Primitive/ButtonPrimitive';
import styles from '../../Button/variations/ButtonDestructive.module.css';
import ButtonPrimitiveAsLink, { BaseButtonPropsAsLink } from '../Primitive/ButtonPrimitiveAsLink';

export type ButtonDestructiveAsLinkPropsType<S extends AvailableSizes> = Omit<
	BaseButtonPropsAsLink<S>,
	'className'
>;

function DestructiveAsLink<S extends AvailableSizes>(
	props: ButtonDestructiveAsLinkPropsType<S>,
	ref: Ref<HTMLAnchorElement>,
) {
	return <ButtonPrimitiveAsLink {...props} ref={ref} className={styles.destructive} />;
}

const ButtonDestructiveAsLink = forwardRef(DestructiveAsLink) as <S extends AvailableSizes>(
	props: ButtonDestructiveAsLinkPropsType<S> & { ref: Ref<HTMLAnchorElement> },
) => ReturnType<typeof DestructiveAsLink>;

export default ButtonDestructiveAsLink;
