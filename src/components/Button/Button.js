import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reakit';
import styled, { css } from 'styled-components';
import tokens from '../../tokens';

const BaseButton = styled(
	React.forwardRef(({ theme, small, ...props }, ref) => <Button ref={ref} {...props} />),
)(
	({ theme, small }) => `
	display: inline-flex;
	align-items: center;
	border: ${tokens.borders.normal};
	border-radius: ${tokens.radii.rectRadius};
	padding: ${tokens.space.none} ${tokens.space.large};
	min-height: ${tokens.sizes.large};
	font-weight: ${tokens.fontWeights.normal};
	font-family: ${tokens.fonts.sansSerif};
	color: ${theme.colors.textColor};
	background: ${tokens.colors.transparent};
	cursor: pointer;

	${
		small
			? `
			padding: ${tokens.space.none} ${tokens.space.small};
			min-height: ${tokens.sizes.small};
		`
			: ''
	}

	&:focus {
		outline: ${tokens.colors.scooter} 0.3rem solid;
	}

	&[aria-disabled='true'] {
		cursor: not-allowed;
	}

	svg {
		margin-left: 1rem;
		fill: currentColor;
		flex-grow: 0;
		flex-shrink: 0;
	}
`,
);

BaseButton.propTypes = {
	small: PropTypes.bool,
	disabled: PropTypes.bool,
	focusable: PropTypes.bool,
};

export default BaseButton;
