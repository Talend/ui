import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import './InlineMessage.css';

import defaultTheme from '../../tokens';

export const StyledInlineMessage = styled.div`
	${(props) => props.withBackground && tw`flex items-center p-2 rounded-md`}
`;
export const StyledParagraph = styled.p`
	${(props) => props.icon && props.withBackground && tw`pl-8`}
`;
export const StyledStrong = styled.strong`
	${tw`inline-flex items-baseline`}
`;
export const StyledIconSpan = styled.span`
	${tw`inline-flex self-center w-6`}
	${(props) => props.withBackground && tw`-ml-6`}

	svg {
		${tw`h-4 max-w-full`}

		path {
			${tw`fill-current`}
		}
	}
`;

export const StyledSpan = styled.span`
	${tw`mr-2`}

	${({ theme, withBackground }) =>
		`color: ${withBackground ? defaultTheme.colors.textColor : theme.colors.textColor};`}
`;

export const StyledLinkSpan = styled(StyledSpan)`
	${({ theme, withBackground }) =>
		`color: ${withBackground ? defaultTheme.colors.activeColor : theme.colors.activeColor};`}
`;

// @link https://inclusive-components.design/notifications
function InlineMessage({ icon, title, description, link, withBackground = false, ...rest }) {
	return (
		<StyledInlineMessage withBackground={withBackground} {...rest} role="status" aria-live="polite">
			<StyledParagraph icon={icon} withBackground={withBackground}>
				{(icon || title) && (
					<StyledStrong>
						{icon && <StyledIconSpan withBackground={withBackground}>{icon}</StyledIconSpan>}
						{title && <StyledSpan withBackground={withBackground}>{title}</StyledSpan>}
					</StyledStrong>
				)}
				{description && <StyledSpan withBackground={withBackground}>{description}</StyledSpan>}
				{link && <StyledLinkSpan withBackground={withBackground}>{link}</StyledLinkSpan>}
			</StyledParagraph>
		</StyledInlineMessage>
	);
}

InlineMessage.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string,
	description: PropTypes.string.isRequired,
	link: PropTypes.node,
	withBackground: PropTypes.bool,
};

export default InlineMessage;
