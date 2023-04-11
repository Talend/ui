import { forwardRef, Ref } from 'react';
import ButtonPrimitive, { AvailableSizes, BaseButtonProps } from '../Primitive/ButtonPrimitive';

import styles from './ButtonDestructive.module.scss';

export type ButtonDestructivePropsType<S extends AvailableSizes> = Omit<
	BaseButtonProps<S>,
	'className' | 'size'
> & {
	size?: S;
};

function Destructive<S extends AvailableSizes>(
	props: ButtonDestructivePropsType<S>,
	ref: Ref<HTMLButtonElement>,
) {
	return <ButtonPrimitive {...props} ref={ref} className={styles.destructive} />;
}

const ButtonDestructive = forwardRef(Destructive) as <S extends AvailableSizes>(
	props: ButtonDestructivePropsType<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof Destructive>;

export default ButtonDestructive;
