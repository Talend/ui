import { forwardRef, Ref } from 'react';

import ButtonPrimitive, { AvailableSizes, BaseButtonProps } from '../Primitive/ButtonPrimitive';

import styles from './ButtonPrimary.module.css';

export type ButtonPrimaryPropsType<S extends AvailableSizes> = Omit<
	BaseButtonProps<S>,
	'className'
>;

function Primary<S extends AvailableSizes>(
	props: ButtonPrimaryPropsType<S>,
	ref: Ref<HTMLButtonElement>,
) {
	return <ButtonPrimitive {...props} ref={ref} className={styles.primary} />;
}

export const ButtonPrimary = forwardRef(Primary) as <S extends AvailableSizes>(
	props: ButtonPrimaryPropsType<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof Primary>;
