import { forwardRef, Ref } from 'react';
import InlineEditingPrimitive, {
	InlineEditingPrimitiveProps,
} from '../Primitives/InlineEditingPrimitive';

export type InlineEditingTextProps = Omit<InlineEditingPrimitiveProps, 'mode'>;

export const InlineEditingText = forwardRef(
	(props: InlineEditingTextProps, ref: Ref<HTMLDivElement>) => {
		return <InlineEditingPrimitive {...props} ref={ref} mode="single" />;
	},
);

InlineEditingText.displayName = 'InlineEditing.Text';
