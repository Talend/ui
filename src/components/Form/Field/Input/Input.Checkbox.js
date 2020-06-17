import React from 'react';
import styled from 'styled-components';
import { Checkbox as ReakitCheckbox, useCheckboxState } from 'reakit/Checkbox';
import tokens from '../../../../tokens';
import icons from '../../../../icons';
import InlineStyle from './styles/Input.Inline.style';

const { validate: ValidateSVG, minus: MinusSVG } = icons;

const InlineField = styled(InlineStyle)(
	({ theme }) => `
	span:before,
	span:after {
		border-radius: ${tokens.radii.inputBorderRadius};
	}

	input:checked + span:after,
	input[aria-checked="mixed"] + span:after {
		background-color: ${theme.colors.inputBackgroundColor};
	}
	
	input:checked + span:after {
		mask-image: url(${ValidateSVG});
	}
	
	input[aria-checked="mixed"] + span:after {
		mask-image: url(${MinusSVG});
	}
`,
);

function Checkbox({ label, indeterminate, checked, ...rest }) {
	const checkbox = useCheckboxState({ state: (indeterminate && 'indeterminate') || checked });

	return (
		<InlineField>
			<label>
				<ReakitCheckbox {...rest} {...checkbox} /> <span>{label}</span>
			</label>
		</InlineField>
	);
}

export default Checkbox;
