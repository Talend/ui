import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reakit';
import styled, { css } from 'styled-components';
import { tint } from 'polished';
import tokens from '../../tokens';

export const BaseButton = styled(Button)`
	display: inline-flex;
	align-items: center;
	border: ${tokens.borders.normal};
	border-radius: ${tokens.borders.rectRadius};
	padding: ${tokens.spacings.none} ${tokens.spacings.large};
	min-height: ${tokens.sizes.large};
	font: ${tokens.typography.normal} ${tokens.typography.fontFamilies.sansSerif};
	background: ${tokens.colors.transparent};
	cursor: pointer;

	${props =>
		props.small &&
		css`
			padding: ${tokens.spacings.none} ${tokens.spacings.small};
			height: ${tokens.sizes.small};
		`}

	&:focus {
		outline: ${tokens.colors.scooter} 0.3rem solid;
	}

	&[disabled],
	&[aria-disabled='true'] {
		color: ${tint(1 - tokens.opacity.disabled, tokens.colors.black)};
		cursor: not-allowed;
	}

	svg {
		margin-left: 1rem;
		fill: currentColor;
		flex: 0 0 1rem;
	}
`;

BaseButton.propTypes = {
	small: PropTypes.bool,
	disabled: PropTypes.bool,
	focusable: PropTypes.bool,
};

export default React.memo(BaseButton);
