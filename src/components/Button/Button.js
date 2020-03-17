import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reakit';
import styled, { css } from 'styled-components';
import tokens from '../../tokens';

	const BaseButton = styled(
		React.forwardRef(({ theme, small, ...props }, ref) => <Button ref={ref} {...props} />),
	)`
	display: inline-flex;
	align-items: center;
	border: ${props => props.theme.borders.normal};
	border-radius: ${props => props.theme.borders.rectRadius};
	padding: ${props => `${props.theme.spacings.none} ${props.theme.spacings.large}`};
	min-height: ${props => props.theme.sizes.large};
	font: ${props =>
		`${props.theme.typography.normal} ${props.theme.typography.fontFamilies.sansSerif}`};
	background: ${props => props.theme.colors.transparent};
	cursor: pointer;

	${props =>
		props.small &&
		css`
			padding: ${props.theme.spacings.none} ${props.theme.spacings.small};
			height: ${props.theme.sizes.small};
		`}

	&:focus {
		outline: ${props => props.theme.colors.scooter} 0.3rem solid;
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

BaseButton.defaultProps = { theme: tokens };

BaseButton.propTypes = {
	small: PropTypes.bool,
	disabled: PropTypes.bool,
	focusable: PropTypes.bool,
};

export default BaseButton;
