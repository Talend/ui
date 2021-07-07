import React from 'react';
import styled from 'styled-components';

import { InputProps } from './Input';
import { InlineStyle } from '../Field.style';

import tokens from '../../../../tokens';

export const SRadio = styled(InlineStyle)<{ readOnly: boolean; checked: boolean }>`
	span:before,
	span:after {
		border-radius: ${tokens.radii.circleRadius};
	}

	input:checked + span:before {
		background-color: ${({ theme }) => theme.colors.inputBackgroundColor};
	}

	input:checked + span:after {
		background-color: ${({ theme }) => theme.colors.activeColor[500]};
	}

	&.input--read-only.input--checked span:after {
		background-color: ${({ theme }) => theme.colors.inputColor};
	}
`;

const Radio = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id = `radio--${Math.floor(Math.random() * 100)}`,
			label,
			checked,
			readOnly,
			required,
			children,
			...rest
		},
		ref,
	) => (
		<SRadio readOnly={!!readOnly} checked={!!checked}>
			<label htmlFor={id}>
				{readOnly ? (
					// @ts-ignore
					<input type="hidden" id={id} {...rest} ref={ref} />
				) : (
					// @ts-ignore
					<input type="radio" id={id} checked={checked} {...rest} ref={ref} />
				)}{' '}
				<span>
					{label || children}
					{required && '*'}
				</span>
			</label>
		</SRadio>
	),
);

export default Radio;
