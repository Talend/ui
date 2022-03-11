import React, { forwardRef, Ref } from 'react';
import ButtonPrimitiveAsLink, {
	BaseButtonPropsAsLink,
} from '../Primitive/ButtonPrimitiveAsLink';

import styles from '../../Button/variations/ButtonDestructive.module.scss';

export type ButtonDestructiveAsLinkPropsType = Omit<BaseButtonPropsAsLink, 'className'>;

const ButtonDestructiveAsLink = forwardRef(
	(props: ButtonDestructiveAsLinkPropsType, ref: Ref<HTMLAnchorElement>) => {
		return <ButtonPrimitiveAsLink {...props} ref={ref} className={styles.destructive} />;
	},
);

export default ButtonDestructiveAsLink;
