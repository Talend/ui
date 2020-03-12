import React from 'react';
import styled, { css } from 'styled-components';
import { tint } from 'polished';
import colors from '../../../tokens/colors.tokens';
import Button from '../Button';

const StyledComponent = styled(Button)`
	border: none;
	color: ${colors.primaryColor};

	&:not([disabled]):hover {
		background: ${tint(0.9, colors.primaryColor)};
	}

	&:not([disabled]):active {
		background: ${tint(0.7, colors.primaryColor)};
	}

	${props =>
		props.disabled &&
		css`
			background-color: ${colors.transparent} !important;
		`}
`;

const ButtonGhost = React.forwardRef((props, ref) => {
	return <StyledComponent {...props} ref={ref} />;
});

ButtonGhost.propTypes = Button.propTypes;

export default React.memo(ButtonGhost);
