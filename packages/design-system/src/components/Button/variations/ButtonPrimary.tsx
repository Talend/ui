import React, { forwardRef, Ref } from 'react';
import ButtonPrimitive, { AvailableSizes, BaseButtonProps } from '../Primitive/ButtonPrimitive';

import styles from './ButtonPrimary.module.scss';

export type ButtonPrimaryPropsType<S extends AvailableSizes> = Omit<
	BaseButtonProps<S>,
	'className' | 'size'
> & {
	size?: S;
};

function Primary<S extends AvailableSizes>(
	props: ButtonPrimaryPropsType<S>,
	ref: Ref<HTMLButtonElement>,
) {
	const { size = 'M', ...rest } = props;
	return <ButtonPrimitive size={size} {...rest} ref={ref} className={styles.primary} />;
}

const ButtonPrimary = forwardRef(Primary);

export default ButtonPrimary;
