import React from 'react';
import styled, { css } from 'styled-components';
import { shade, tint } from 'polished';
import { VisuallyHidden } from 'reakit';
import Button from '../Button';
import Icon from '../../Icon';
import tokens from '../../../tokens';

const StyledButton = styled(Button)`
	padding: 0;
	min-height: unset;
	height: ${tokens.sizes.small};
	width: ${tokens.sizes.small};
	align-items: center;
	justify-content: center;
	color: ${tokens.colors.primaryColor};
	border: 2px solid ${tokens.colors.primaryColor};
	border-radius: ${tokens.borders.circleRadius};

	&:not([disabled]):hover {
		color: ${shade(0.2, tokens.colors.primaryColor)};
		border-color: ${shade(0.2, tokens.colors.primaryColor)};
	}

	&:not([disabled]):active {
		color: ${shade(0.4, tokens.colors.primaryColor)};
		border-color: ${shade(0.4, tokens.colors.primaryColor)};
	}

	svg {
		margin: 0;
		height: 1.2rem;
	}

	${props =>
		props.disabled &&
		css`
			border-color: ${tint(1 - tokens.opacity.disabled, tokens.colors.black)} !important;
		`}
`;

const ButtonIcon = React.forwardRef(({ icon, children, ...props }, ref) => {
	return (
		<StyledButton {...props} ref={ref}>
			{icon && <Icon name={icon} />}
			{children && <VisuallyHidden>{children}</VisuallyHidden>}
		</StyledButton>
	);
});

ButtonIcon.propTypes = Button.propTypes;

export default ButtonIcon;
