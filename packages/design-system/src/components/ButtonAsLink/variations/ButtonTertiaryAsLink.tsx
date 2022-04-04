import React, { forwardRef, Ref } from 'react';
import ButtonPrimitiveAsLink, {
	BaseButtonPropsAsLink,
} from '../Primitive/ButtonPrimitiveAsLink';

import styles from '../../Button/variations/ButtonTertiary.module.scss';

export type ButtonTertiaryAsLinkPropsType = Omit<BaseButtonPropsAsLink, 'className'>;

const ButtonTertiaryAsLink = forwardRef(
	(props: ButtonTertiaryAsLinkPropsType, ref: Ref<HTMLAnchorElement>) => {
		return <ButtonPrimitiveAsLink {...props} ref={ref} className={styles.tertiary} />;
	},
);

export default ButtonTertiaryAsLink;
