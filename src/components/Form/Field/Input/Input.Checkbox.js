import React from 'react';
import styled from 'styled-components';
import { Checkbox as ReakitCheckbox, useCheckboxState } from 'reakit';
import tokens from '../../../../tokens';
import InlineStyle from './styles/Input.Inline.style';
import { Icon } from '../../../Icon/Icon';

const InlineField = styled(InlineStyle)`
	span:before,
	span:after {
		border-radius: ${tokens.radii.inputBorderRadius};
	}

	input:checked + span:after,
	input[aria-checked='mixed'] + span:after {
		background-color: transparent;
	}

	label {
		position: relative;
	}

	.tc-svg-icon {
		position: absolute;
		top: 1px;
		left: 1px;
		width: 1rem;
	}

	input:checked ~ .tc-svg-icon,
	input[aria-checked='mixed'] ~ .tc-svg-icon .ti-foreground {
		fill: ${({ theme }) => theme.colors.inputBackgroundColor};
	}

	// FIXME
	input[aria-checked='mixed'] ~ .tc-svg-icon circle {
		display: none;
	}
`;

function Checkbox({ label, indeterminate, checked, ...rest }) {
	const checkbox = useCheckboxState({ state: (indeterminate && 'indeterminate') || checked });

	return (
		<InlineField>
			<label>
				<ReakitCheckbox {...rest} {...checkbox} /> <span>{label}</span>
				{checkbox.state === 'indeterminate' ? (
					<Icon name="talend-minus-circle" />
				) : (
					checkbox.state && <Icon name="talend-check" />
				)}
			</label>
		</InlineField>
	);
}

export default Checkbox;
