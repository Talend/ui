import { forwardRef, Ref } from 'react';
import ButtonIconPrimitive, { AvailableSizes, ToggleTypes } from '../Primitive/ButtonIconPrimitive';

export type ButtonToggleType<S extends Partial<AvailableSizes>> = Omit<
	ToggleTypes<S>,
	'variant' | 'size'
> & { size?: 'M' | 'S' };

function Toggle<S extends Partial<AvailableSizes>>(
	props: ButtonToggleType<S>,
	ref: Ref<HTMLButtonElement>,
) {
	return <ButtonIconPrimitive {...props} variant="toggle" ref={ref} />;
}

const ButtonIconToggle = forwardRef(Toggle) as <S extends Partial<AvailableSizes>>(
	props: ButtonToggleType<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof Toggle>;

export default ButtonIconToggle;
