import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reakit';
import styled, { css } from 'styled-components';
import { tokens } from '../../tokens';

const BaseButton = styled(
	React.forwardRef(({ theme, small, ...props }, ref) => <Button ref={ref} {...props} />),
)`
	display: inline-flex;
	align-items: center;
	border: ${tokens.borders.normal};
	border-radius: ${tokens.radii.rectRadius};
	padding: ${`${tokens.space.none} ${tokens.space.large}`};
	min-height: ${tokens.sizes.large};
	font: ${`${tokens.fontWeights.normal} ${tokens.fonts.sansSerif}`};
	background: ${tokens.colors.transparent};
	cursor: pointer;

	${(props) =>
		props.small &&
		css`
			padding: ${tokens.space.none} ${tokens.space.small};
			height: ${tokens.sizes.small};
		`}

	&:focus {
		outline: ${tokens.colors.scooter} 0.3rem solid;
	}

	&[aria-disabled='true'] {
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

export default BaseButton;
