import { forwardRef, Ref } from 'react';
import InlineEditingPrimitive, {
	InlineEditingPrimitiveProps,
} from '../Primitives/InlineEditingPrimitive';

const InlineEditingText = forwardRef(
	(props: Omit<InlineEditingPrimitiveProps, 'mode'>, ref: Ref<HTMLDivElement>) => {
		return <InlineEditingPrimitive {...props} ref={ref} mode="single" />;
	},
);

InlineEditingText.displayName = 'InlineEditing.Text';

export default InlineEditingText;
