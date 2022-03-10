import React, { forwardRef, Ref } from 'react';
import ButtonPrimitiveAsLink, {
	BaseButtonPropsAsLink,
} from '../Primitive/ButtonPrimitiveAsLink';

import styles from '../../Button/variations/ButtonSecondary.module.scss';

export type ButtonSecondaryAsLinkPropsType = Omit<BaseButtonPropsAsLink, 'className'>;

const ButtonSecondaryAsLink = forwardRef(
	(props: ButtonSecondaryAsLinkPropsType, ref: Ref<HTMLAnchorElement>) => {
		return <ButtonPrimitiveAsLink {...props} ref={ref} className={styles.secondary} />;
	},
);

export default ButtonSecondaryAsLink;
