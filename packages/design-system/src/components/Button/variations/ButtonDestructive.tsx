import React, { forwardRef, Ref } from 'react';
import ButtonPrimitive, { BaseButtonProps } from '../Primitive/ButtonPrimitive';

import styles from './ButtonDestructive.module.scss';

export type ButtonDestructivePropsType = Omit<BaseButtonProps, 'className'>;

const ButtonDestructive = forwardRef(
	(props: ButtonDestructivePropsType, ref: Ref<HTMLButtonElement>) => {
		return <ButtonPrimitive {...props} ref={ref} className={styles.destructive} />;
	},
);

export default ButtonDestructive;
