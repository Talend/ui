import React from 'react';
import { Radio as ReakitRadio } from 'reakit';
import styled from 'styled-components';

import tokens from '../../../../tokens';

import InlineStyle from './styles/Input.Inline.style';

const InlineField = styled(InlineStyle)(
	({ theme }) => `
		span:before,
		span:after {
			border-radius: ${tokens.radii.circleRadius};
		}
		
		input:checked + span:before {
			background-color: ${theme.colors.inputBackgroundColor};
		}
	
		input:checked + span:after {
			background-color: ${theme.colors.activeColor};
		}
	`,
);

function Radio({ label, ...rest }) {
	return (
		<InlineField>
			<label>
				<ReakitRadio {...rest} /> <span>{label}</span>
			</label>
		</InlineField>
	);
}

export default Radio;
