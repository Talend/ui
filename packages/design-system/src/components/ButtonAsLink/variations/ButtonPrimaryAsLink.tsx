import React, { forwardRef, Ref } from 'react';
import ButtonPrimitiveAsLink, {
	BaseButtonPropsAsLink,
} from '../Primitive/ButtonPrimitiveAsLink';

import styles from '../../Button/variations/ButtonPrimary.module.scss';

export type ButtonPrimaryAsLinkPropsType = Omit<BaseButtonPropsAsLink, 'className'>;

const ButtonPrimaryAsLink = forwardRef(
	(props: ButtonPrimaryAsLinkPropsType, ref: Ref<HTMLAnchorElement>) => {
		return <ButtonPrimitiveAsLink {...props} ref={ref} className={styles.primary} />;
	},
);

export default ButtonPrimaryAsLink;
