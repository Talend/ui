import React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';
import { useCheckboxState, Checkbox } from 'reakit';

import { InputProps } from './Input';
import tokens from '../../../../tokens';
import { InlineStyle } from '../Field.style';

const SSwitch = styled(InlineStyle)<{ readOnly: boolean; checked: boolean }>`
	&& {
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
			background: ${({ theme }) => shade(0.25, theme.colors.activeColor[500])};
		}

		&.input--checked span:before {
			background: ${({ theme }) => theme.colors.activeColor[500]};
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
	}
`;

const Switch = React.forwardRef<HTMLInputElement, InputProps>(
	({ id = `switch--${Date.now()}`, label, checked, readOnly, ...rest }, ref) => {
		const checkbox = useCheckboxState({ state: checked });

		React.useEffect(() => {
			checkbox.setState(checked);
		}, [checked]);

		return (
			<SSwitch readOnly={!!readOnly} checked={!!checkbox.state} ref={ref}>
				<label htmlFor={id}>
					{!readOnly && (
						// @ts-ignore
						<Checkbox id={id} {...rest} {...checkbox} />
					)}
					<span>{label}</span>
				</label>
			</SSwitch>
		);
	},
);

export default Switch;
