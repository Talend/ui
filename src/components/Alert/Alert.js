import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import './Alert.css';

export const StyledAlert = styled.div`
	${props => props.background && tw`flex items-center p-2 rounded-md`}
`;
export const StyledParagraph = styled.p`
	${props => props.icon && props.background && tw`pl-8`}
`;
export const StyledStrong = styled.strong`
	${tw`inline-flex items-baseline`}
`;
export const StyledIconSpan = styled.span`
	${tw`inline-flex self-center w-6`}
	${props => props.background && tw`-ml-6`}

	svg {
		${tw`h-4 max-w-full fill-current`}
	}
`;
export const StyledSpan = styled.span`
	${tw`mr-1`}
`;

// @link https://inclusive-components.design/notifications
function Alert({ icon, title, description, link, background = false, ...rest }) {
	return (
		<StyledAlert background={background} {...rest} role="status" aria-live="polite">
			<StyledParagraph icon={icon} background={background}>
				{(icon || title) && (
					<StyledStrong>
						{icon && <StyledIconSpan background={background}>{icon}</StyledIconSpan>}
						{title && <StyledSpan>{title}</StyledSpan>}
					</StyledStrong>
				)}
				{description && <StyledSpan>{description}</StyledSpan>}
				{link && <StyledSpan>{link}</StyledSpan>}
			</StyledParagraph>
		</StyledAlert>
	);
}

Alert.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string,
	description: PropTypes.string.isRequired,
	link: PropTypes.node,
	background: PropTypes.bool,
};

export default Alert;
