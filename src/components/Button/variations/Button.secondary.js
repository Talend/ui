import React from 'react';
import styled, { css } from 'styled-components';
import { tint } from 'polished';
import colors from '../../../tokens/colors.tokens';
import Button from '../Button';

const StyledComponent = styled(Button)`
	color: ${colors.primaryColor};
	background: ${colors.white};

	&:not([disabled]):hover {
		background: ${tint(0.9, colors.primaryColor)};
	}

	&:not([disabled]):active {
		background: ${tint(0.7, colors.primaryColor)};
	}

	${props =>
		props.disabled &&
		css`
			border-color: ${colors.alto};
			background-color: ${colors.white} !important;
		`}
`;

const ButtonSecondary = React.forwardRef((props, ref) => {
	return <StyledComponent {...props} ref={ref} />;
});

ButtonSecondary.propTypes = Button.propTypes;

export default React.memo(ButtonSecondary);
