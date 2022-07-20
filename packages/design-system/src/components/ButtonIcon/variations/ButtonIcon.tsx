import React, { forwardRef, Ref } from 'react';
import ButtonIconPrimitive, {
	AvailableSizes,
	DefaultTypes,
} from '../Primitive/ButtonIconPrimitive';

export type ButtonIconType<S extends AvailableSizes> = Omit<DefaultTypes<S>, 'variant'>;

function Button<S extends AvailableSizes>(props: ButtonIconType<S>, ref: Ref<HTMLButtonElement>) {
	return <ButtonIconPrimitive {...props} variant="default" ref={ref} />;
}

const ButtonIcon = forwardRef(Button) as <S extends AvailableSizes>(
	props: ButtonIconType<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof Button>;

export default ButtonIcon;
