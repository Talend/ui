import { forwardRef, Ref } from 'react';

import ButtonPrimitive, { AvailableSizes, BaseButtonProps } from '../Primitive/ButtonPrimitive';
import { ButtonDestructivePropsType } from './ButtonDestructive';
import styles from './ButtonTertiary.module.css';

export type ButtonTertiaryPropsType<S extends AvailableSizes> = Omit<
	BaseButtonProps<S>,
	'className'
>;

function Tertiary<S extends AvailableSizes>(
	props: ButtonTertiaryPropsType<S>,
	ref: Ref<HTMLButtonElement>,
) {
	return <ButtonPrimitive {...props} ref={ref} className={styles.tertiary} />;
}

const ButtonTertiary = forwardRef(Tertiary) as <S extends AvailableSizes>(
	props: ButtonDestructivePropsType<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof Tertiary>;

export default ButtonTertiary;
