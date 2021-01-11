import React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';
import { useCheckboxState, Checkbox } from 'reakit';
import InlineStyle from './styles/Input.Inline.style';
import tokens from '../../../../tokens';

const InlineField = styled(InlineStyle)`
	span {
		padding-left: calc(1rem + ${tokens.sizes.xxl});
	}

	span:before,
	span:after {
		top: 0;
		border-radius: ${tokens.radii.roundedRadius};
	}

	span:before {
		width: ${tokens.sizes.xxl};
		height: 1.6rem;
		background: ${({ theme }) => theme.colors.inputRadioBackgroundColor};
		box-shadow: inset 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.25);
	}

	span:after {
		height: 1.2rem;
		width: 1.2rem;
		transition: transform ${tokens.transitions.normal};
	}

	input:not(:disabled) + span:hover:before,
	input:not(:disabled):focus + span:before {
		background: ${({ theme }) => shade(0.25, theme.colors.inputRadioBackgroundColor)};
		box-shadow: inset 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.25);
	}

	input:not(:disabled):checked + span:hover:before,
	input:not(:disabled):checked:focus + span:before {
		background: ${({ theme }) => shade(0.25, theme.colors.activeColor)};
	}

	&.input--checked span:before {
		background: ${({ theme }) => theme.colors.activeColor};
		box-shadow: inset 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.25);
	}

	&.input--checked span:after {
		transform: translateX(1.5rem);
	}

	&.input--read-only span:before {
		background: ${({ theme }) => theme.colors.inputReadOnlyBackgroundColor};
		box-shadow: none;
	}

	&.input--read-only span:after {
		background: ${({ theme }) => theme.colors.inputBackgroundColor};
	}

	&.input--read-only.input--checked span:after {
		background: ${({ theme }) => theme.colors.inputColor};
	}
`;

function Switch({ label, checked, readOnly, ...rest }) {
	const checkbox = useCheckboxState({ state: checked });
	return (
		<InlineField readOnly={readOnly} checked={checkbox.state}>
			<label>
				{!readOnly && <Checkbox {...rest} {...checkbox} />}
				<span>{label}</span>
			</label>
		</InlineField>
	);
}

export default Switch;
