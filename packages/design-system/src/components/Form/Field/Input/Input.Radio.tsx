import { forwardRef, Ref } from 'react';
import { RadioPrimitive, RadioPrimitiveType } from '../../Primitives/index';

export type RadioProps = Omit<RadioPrimitiveType, 'className' | 'style'>;

const Radio = forwardRef((props: RadioProps, ref: Ref<HTMLInputElement>) => {
	return <RadioPrimitive {...props} ref={ref} />;
});

Radio.displayName = 'Radio';

export default Radio;
