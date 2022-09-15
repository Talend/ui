import React, { forwardRef, Ref } from 'react';
import { LabelPrimitive, LabelPrimitiveProps } from '../FormPrimitives/index';

const Label = forwardRef(
	(props: Omit<LabelPrimitiveProps, 'className' | 'style'>, ref: Ref<HTMLLabelElement>) => {
		const { children, ...rest } = props;
		return (
			<LabelPrimitive {...rest} ref={ref}>
				{children}
			</LabelPrimitive>
		);
	},
);

Label.displayName = 'Label';

export default Label;
