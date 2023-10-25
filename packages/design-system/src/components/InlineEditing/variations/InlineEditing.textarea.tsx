import { forwardRef, Ref } from 'react';
import InlineEditingPrimitive, {
	InlineEditingPrimitiveProps,
} from '../Primitives/InlineEditingPrimitive';

export type InlineEditingTextareaProps = Omit<InlineEditingPrimitiveProps, 'mode'>;

export const InlineEditingTextarea = forwardRef(
	(props: InlineEditingTextareaProps, ref: Ref<HTMLDivElement>) => {
		return <InlineEditingPrimitive {...props} ref={ref} mode="multi" />;
	},
);

InlineEditingTextarea.displayName = 'InlineEditing.Multi';
