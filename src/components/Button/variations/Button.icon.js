import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade, tint } from 'polished';
import { VisuallyHidden } from 'reakit';
import ButtonBase from '../Button';
import Icon from '../../Icon';
import tokens from '../../../tokens';

const StyledButton = styled(ButtonBase)`
	padding: 0;
	min-height: unset;
	height: ${tokens.sizes.small};
	width: ${tokens.sizes.small};
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.primaryColor};
	border: 2px solid ${({ theme }) => theme.colors.primaryColor};
	border-radius: ${tokens.radii.circleRadius};

	&:not([aria-disabled='true']):hover {
		color: ${({ theme }) => shade(0.2, theme.colors.primaryColor)};
		border-color: ${({ theme }) => shade(0.2, theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		color: ${({ theme }) => shade(0.4, theme.colors.primaryColor)};
		border-color: ${({ theme }) => shade(0.4, theme.colors.primaryColor)};
	}

	svg {
		margin: 0;
		height: 1.2rem;
	}

	&[aria-disabled='true'] {
		border-color: ${({ theme }) =>
			tint(1 - tokens.opacity.disabled, theme.colors.textColor)} !important;
	}
`;

const ButtonIcon = React.forwardRef(({ icon, children, ...props }, ref) => {
	return (
		<StyledButton {...props} ref={ref}>
			{icon && <Icon name={icon} />}
			{children && <VisuallyHidden>{children}</VisuallyHidden>}
		</StyledButton>
	);
});

ButtonIcon.propTypes = {
	...ButtonBase.propTypes,
	icon: PropTypes.string.isRequired,
};

export default ButtonIcon;
