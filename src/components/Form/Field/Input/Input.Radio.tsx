import React from 'react';
import styled from 'styled-components';
import { unstable_useId as useId } from 'reakit';

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

const Radio = React.forwardRef(
	(
		{ id, label, checked, readOnly, required, children, ...rest }: InputProps,
		ref: React.Ref<HTMLInputElement>,
	) => {
		const { id: reakitId } = useId();
		const radioId = `radio--${id || reakitId}`;
		return (
			<SRadio readOnly={!!readOnly} checked={!!checked}>
				<label htmlFor={radioId}>
					{readOnly ? (
						// @ts-ignore
						<input type="hidden" id={radioId} {...rest} ref={ref} />
					) : (
						// @ts-ignore
						<input type="radio" id={radioId} checked={checked} {...rest} ref={ref} />
					)}{' '}
					<span>
						{label || children}
						{required && '*'}
					</span>
				</label>
			</SRadio>
		);
	},
);

export default Radio;
