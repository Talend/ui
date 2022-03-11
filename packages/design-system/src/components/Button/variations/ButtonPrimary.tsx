import React, { forwardRef, Ref } from 'react';
import ButtonPrimitive, { BaseButtonProps } from '../Primitive/ButtonPrimitive';

import styles from './ButtonPrimary.module.scss';

export type ButtonPrimaryPropsType = Omit<BaseButtonProps, 'className'>;

const ButtonPrimary = forwardRef((props: ButtonPrimaryPropsType, ref: Ref<HTMLButtonElement>) => {
	return <ButtonPrimitive {...props} ref={ref} className={styles.primary} />;
});

export default ButtonPrimary;
