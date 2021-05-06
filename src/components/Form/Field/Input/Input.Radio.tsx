import React from 'react';
import { Radio as ReakitRadio } from 'reakit';
import styled from 'styled-components';

import tokens from '../../../../tokens';

import InlineStyle from './styles/Input.Inline.style';

const InlineField = styled(InlineStyle)<{ readOnly: boolean; checked: boolean }>`
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

export type RadioProps = HTMLInputElement & {
	label: string;
};

const Radio = ({ id = `radio--${Date.now()}`, label, checked, readOnly, ...rest }: RadioProps) => (
	<InlineField readOnly={readOnly} checked={checked}>
		<label htmlFor={id}>
			{!readOnly && (
				<>
					{/*
					// @ts-ignore */}
					<ReakitRadio id={id} checked={checked} {...rest} />
				</>
			)}{' '}
			<span>{label}</span>
		</label>
	</InlineField>
);

export default Radio;
