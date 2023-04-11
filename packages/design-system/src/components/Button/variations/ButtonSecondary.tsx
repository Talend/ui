import { forwardRef, Ref } from 'react';
import ButtonPrimitive, { AvailableSizes, BaseButtonProps } from '../Primitive/ButtonPrimitive';

import styles from './ButtonSecondary.module.scss';
import { ButtonDestructivePropsType } from './ButtonDestructive';

export type ButtonSecondaryPropsType<S extends AvailableSizes> = Omit<
	BaseButtonProps<S>,
	'className' | 'size'
> & {
	size?: S;
};

function Secondary<S extends AvailableSizes>(
	props: ButtonSecondaryPropsType<S>,
	ref: Ref<HTMLButtonElement>,
) {
	return <ButtonPrimitive {...props} ref={ref} className={styles.secondary} />;
}

const ButtonSecondary = forwardRef(Secondary) as <S extends AvailableSizes>(
	props: ButtonDestructivePropsType<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof Secondary>;

export default ButtonSecondary;
