import React, { forwardRef, Ref } from 'react';
import InlineEditingPrimitive, {
	InlineEditingPrimitiveProps,
} from '../Primitives/InlineEditingPrimitive';

const InlineEditingMulti = forwardRef(
	(props: Omit<InlineEditingPrimitiveProps, 'mode'>, ref: Ref<HTMLDivElement>) => {
		return <InlineEditingPrimitive {...props} ref={ref} mode="multi" />;
	},
);

InlineEditingMulti.displayName = 'InlineEditing.Multi';

export default InlineEditingMulti;
