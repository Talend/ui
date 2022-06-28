import React, { forwardRef, Ref } from 'react';
import ButtonPrimitive, { AvailableSizes, BaseButtonProps } from '../Primitive/ButtonPrimitive';

import styles from './ButtonSecondary.module.scss';

export type ButtonSecondaryPropsType = Omit<BaseButtonProps<AvailableSizes>, 'className'>;

const ButtonSecondary = forwardRef(
	(props: ButtonSecondaryPropsType, ref: Ref<HTMLButtonElement>) => {
		return <ButtonPrimitive {...props} ref={ref} className={styles.secondary} />;
	},
);

export default ButtonSecondary;
