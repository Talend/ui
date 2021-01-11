import React from 'react';
import { Radio as ReakitRadio } from 'reakit';
import styled from 'styled-components';

import tokens from '../../../../tokens';

import InlineStyle from './styles/Input.Inline.style';

const InlineField = styled(InlineStyle)`
	span:before,
	span:after {
		border-radius: ${tokens.radii.circleRadius};
	}

	input:checked + span:before {
		background-color: ${({ theme }) => theme.colors.inputBackgroundColor};
	}

	input:checked + span:after {
		background-color: ${({ theme }) => theme.colors.activeColor};
	}

	&.input--read-only.input--checked span:after {
		background-color: ${({ theme }) => theme.colors.inputColor};
	}
`;

function Radio({ label, checked, readOnly, ...rest }) {
	return (
		<InlineField readOnly={readOnly} checked={checked}>
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
			<label>
				{!readOnly && <ReakitRadio checked={checked} {...rest} />} <span>{label}</span>
			</label>
		</InlineField>
	);
}

export default Radio;
