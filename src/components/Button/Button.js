import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reakit';
import styled, { createGlobalStyle, css, ThemeContext } from 'styled-components';
import { tint } from 'polished';
import tokens from '../../tokens';

export const StyledComponent = styled(Button)`
	display: inline-flex;
	align-items: baseline;
	margin: ${tokens.spacings.smaller} ${tokens.spacings.small};
	border: ${tokens.borders.normal};
	border-radius: ${tokens.borders.rectRadius};
	padding: ${tokens.spacings.none} ${tokens.spacings.normal};
	height: ${tokens.sizes.large};
	font: ${tokens.typography.normal};
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

	${props =>
		props.disabled &&
		css`
			color: ${tint(1 - tokens.opacity.disabled, tokens.colors.black)} !important;
			cursor: not-allowed !important;
		`}

	svg {
		margin-left: 1rem;
		height: 1rem;
		max-width: 100%;
		fill: currentColor;
	}
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme?.mainBackgroundColor};
  }
`;

const BaseButton = React.forwardRef((props, ref) => {
	// const themeContext = useContext(ThemeContext);
	return <StyledComponent {...props} ref={ref} />;
});

BaseButton.propTypes = {
	small: PropTypes.bool,
	disabled: PropTypes.bool,
	focusable: PropTypes.bool,
};

export default React.memo(BaseButton);
