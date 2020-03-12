import React from 'react';
import styled, { css } from 'styled-components';
import { shade } from 'polished';
import colors from '../../../tokens/colors.tokens';
import Button from '../Button';

const StyledComponent = styled(Button)`
	color: ${colors.white};
	background: ${colors.primaryColor};
	border-color: ${colors.transparent};

	&:not([disabled]):hover {
		background: ${shade(0.2, colors.primaryColor)};
	}

	&:not([disabled]):active {
		background: ${shade(0.4, colors.primaryColor)};
	}

	${props =>
		props.disabled &&
		css`
			border-color: ${colors.alto};
			background-color: ${colors.alto} !important;
		`}
`;

const ButtonPrimary = React.forwardRef((props, ref) => {
	return <StyledComponent {...props} ref={ref} />;
});

ButtonPrimary.propTypes = Button.propTypes;

export default React.memo(ButtonPrimary);
