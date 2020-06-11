import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade, tint } from 'polished';
import { VisuallyHidden } from 'reakit';
import ButtonBase from '../Button';
import Icon from '../../Icon';

const StyledButton = styled(ButtonBase)`
	padding: 0;
	min-height: unset;
	height: ${(props) => props.theme.sizes.small};
	width: ${(props) => props.theme.sizes.small};
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.colors.primaryColor};
	border: 2px solid ${(props) => props.theme.colors.primaryColor};
	border-radius: ${(props) => props.theme.radii.circleRadius};

	&:not([aria-disabled='true']):hover {
		color: ${(props) => shade(0.2, props.theme.colors.primaryColor)};
		border-color: ${(props) => shade(0.2, props.theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		color: ${(props) => shade(0.4, props.theme.colors.primaryColor)};
		border-color: ${(props) => shade(0.4, props.theme.colors.primaryColor)};
	}

	svg {
		margin: 0;
		height: 1.2rem;
	}

	&[aria-disabled='true'] {
		border-color: ${(props) =>
			tint(1 - props.theme.opacity.disabled, props.theme.colors.black)} !important;
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
