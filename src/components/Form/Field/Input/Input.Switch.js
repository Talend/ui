import React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';
import { useCheckboxState, Checkbox } from 'reakit/Checkbox';
import InlineStyle from './styles/Input.Inline.style';
import tokens from '../../../../tokens';

const Div = styled(InlineStyle)(
	({ theme, readOnly }) => `
	input + span {
		padding-left: calc(1rem + ${tokens.sizes.xxl});
	}
	
	input + span:before,
	input + span:after {
		top: 0;
		border-radius: 10rem;
	}
	
	input + span:before {
		width: ${tokens.sizes.xxl};
		height: 1.6rem;
	}
	
	input + span:after {
		height: 1.2rem;
		width: 1.2rem;
		transition: transform .3s;
	}

	input + span:before {
		background: ${theme.colors.inputRadioBackgroundColor};
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
	}
	
	${
		!readOnly
			? `
			input:not(:disabled) + span:hover:before,
			input:not(:disabled):focus + span:before {
				background: ${shade(0.25, theme.colors.inputRadioBackgroundColor)};
				box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
			}
			
			input:not(:disabled):checked + span:hover:before,
			input:not(:disabled):checked:focus + span:before {
				background: ${shade(0.25, theme.colors.activeColor)};
			}
		`
			: `
			// FIXME
			pointer-events: none;	
		`
	}
	
	input:checked + span:before {
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
	}
	
	input:checked + span:before {
		background: ${theme.colors.activeColor};	
	}
	
	input:checked + span:after {
		transform: translateX(1.5rem); 
	}
`,
);

function Switch({ label, value, checked, disabled, readOnly, ...rest }) {
	const checkbox = useCheckboxState({ state: checked });
	return (
		<Div readOnly={readOnly}>
			<label>
				<Checkbox {...rest} {...checkbox} /> <span>{label}</span>
			</label>
		</Div>
	);
}

export default Switch;
