import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

import './InlineMessage.css';

import tokens from '../../tokens';

export const StyledInlineMessage = styled(
	React.forwardRef(({ theme, ...props }, ref) => <div ref={ref} {...props} />),
)`
	${props => props.withBackground && tw`flex items-center p-2 rounded-md`}
`;
export const StyledParagraph = styled.p`
	${props => props.icon && props.withBackground && tw`pl-8`}
`;
export const StyledStrong = styled.strong`
	${tw`inline-flex items-baseline`}
`;
export const StyledIconSpan = styled.span`
	${tw`inline-flex self-center w-6`}
	${props => props.withBackground && tw`-ml-6`}

	svg {
		${tw`h-4 max-w-full fill-current`}
	}
`;
export const StyledSpan = styled.span`
	${tw`mr-2`}

	a {
		${tw`text-blue-500`}
	}
`;

// @link https://inclusive-components.design/notifications
function InlineMessage({ icon, title, description, link, withBackground = false, ...rest }) {
	return (
		<StyledInlineMessage withBackground={withBackground} {...rest} role="status" aria-live="polite">
			<StyledParagraph icon={icon} withBackground={withBackground}>
				{(icon || title) && (
					<StyledStrong>
						{icon && <StyledIconSpan withBackground={withBackground}>{icon}</StyledIconSpan>}
						{title && <StyledSpan>{title}</StyledSpan>}
					</StyledStrong>
				)}
				{description && <StyledSpan>{description}</StyledSpan>}
				{link && <StyledSpan>{link}</StyledSpan>}
			</StyledParagraph>
		</StyledInlineMessage>
	);
}

InlineMessage.defaultProps = { theme: tokens };

InlineMessage.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string,
	description: PropTypes.string.isRequired,
	link: PropTypes.node,
	withBackground: PropTypes.bool,
};

export default InlineMessage;
