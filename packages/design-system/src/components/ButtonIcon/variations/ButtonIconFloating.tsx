import { forwardRef, Ref } from 'react';
import ButtonIconPrimitive, {
	AvailableSizes,
	FloatingTypes,
} from '../Primitive/ButtonIconPrimitive';

export type ButtonFloatingType<S extends Partial<AvailableSizes>> = Omit<
	FloatingTypes<S>,
	'variant' | 'size'
> & { size?: 'M' | 'S' };

function Floating<S extends Partial<AvailableSizes>>(
	props: ButtonFloatingType<S>,
	ref: Ref<HTMLButtonElement>,
) {
	return <ButtonIconPrimitive {...props} variant="floating" ref={ref} />;
}

const ButtonIconFloating = forwardRef(Floating) as <S extends Partial<AvailableSizes>>(
	props: ButtonFloatingType<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof Floating>;

export default ButtonIconFloating;
