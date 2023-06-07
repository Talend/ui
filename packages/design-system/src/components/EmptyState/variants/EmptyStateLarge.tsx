import { forwardRef, Ref } from 'react';
import Illustration from '../../illustrations';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

export type EmptyStateLargeProps = Omit<EmptyStatePrimitiveProps, 'illustration'> & {
	description: string;
};

const EmptyStateLarge = forwardRef((props: EmptyStateLargeProps, ref: Ref<HTMLElement>) => {
	return (
		<EmptyStatePrimitive
			aria-live="polite"
			{...props}
			illustration={<Illustration.IconSpotDefault />}
			ref={ref}
		/>
	);
});

export default EmptyStateLarge;
