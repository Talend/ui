import React, { forwardRef, Ref } from 'react';
import ButtonPrimitive, { AvailableSizes, BaseButtonProps } from '../Primitive/ButtonPrimitive';

import styles from './ButtonTertiary.module.scss';

export type ButtonTertiaryPropsType = Omit<BaseButtonProps<AvailableSizes>, 'className'>;

const ButtonTertiary = forwardRef((props: ButtonTertiaryPropsType, ref: Ref<HTMLButtonElement>) => {
	return <ButtonPrimitive {...props} ref={ref} className={styles.tertiary} />;
});

export default ButtonTertiary;
