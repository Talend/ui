import React from 'react';
import { isElement } from 'react-is';

import * as S from './Buttons.style';

type ButtonsProps = React.HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean;
	readOnly?: boolean;
};

const Buttons = React.forwardRef(
	({ disabled, readOnly, children, ...rest }: ButtonsProps, ref: React.Ref<HTMLDivElement>) => {
		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		return (
			<S.Buttons className="c-form__buttons" {...rest} ref={ref}>
				{React.Children.toArray(children).map(child =>
					isElement(child) ? React.cloneElement(child, childrenProps) : child,
				)}
			</S.Buttons>
		);
	},
);

export default Buttons;
