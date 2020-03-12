import React from 'react';
import styled, { css } from 'styled-components';
import { shade, tint } from 'polished';
import { VisuallyHidden } from 'reakit';
import Button from '../Button';
import Icon from '../../Icon';
import tokens from '../../../tokens';

const StyledComponent = styled(Button)`
	padding: 0;
	height: 2.4rem;
	width: 2.4rem;
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
		<StyledComponent {...props} ref={ref}>
			{icon && <Icon name={icon} />}
			{children && <VisuallyHidden>{children}</VisuallyHidden>}
		</StyledComponent>
	);
});

ButtonIcon.propTypes = Button.propTypes;

export default React.memo(ButtonIcon);
