import * as React from 'react';
import styled from 'styled-components';

import tokens from '../../tokens';

export const StyledInlineMessage = styled.div`
	${(props) =>
		props.withBackground &&
		`
		display: flex; 
		align-items: center;
	`}
`;
export const StyledParagraph = styled.p`
	${(props) => props.icon && props.withBackground && `padding-left: 2rem;`}
`;
export const StyledStrong = styled.strong`
	display: inline-flex;
	align-items: baseline;
`;
export const StyledIconSpan = styled.span`
	display: inline-flex;
	align-self: center;
	width: 1rem;

	${(props) => props.withBackground && `margin-left: -6rem`}

	svg {
		height: 1.6rem;
		max-width: 100% path {
			fill: currentColor;
		}
	}
`;

export const StyledSpan = styled.span`
	margin-right: 1rem;

	${({ theme, withBackground }) =>
		`color: ${withBackground ? tokens.colors.black : theme.colors.textColor};`}
`;

export const StyledLinkSpan = styled(StyledSpan)`
	${({ theme, withBackground }) =>
		`color: ${withBackground ? tokens.colors.lochmara : theme.colors.activeColor};`}
`;

export type InlineMessageProps = {
	/** The icon element to display */
	icon?: React.ReactNode;
	/** The title of the message */
	title?: string;
	/** The content of the message */
	description: string;
	/**
	 Link element at the end
	 */
	link?: React.ReactNode;
	/** If it is an inline message or a block with a background */
	withBackground?: boolean;
};

/**
 Inline message highlights information necessary to display for the user in many different contexts.
 It can be additional information related to system status, it can be a required action to complete the current task.
 @link https://inclusive-components.design/notifications
 **/
const InlineMessage: React.FC<InlineMessageProps> = ({
	icon,
	title,
	description,
	link,
	withBackground = false,
	...rest
}: InlineMessageProps) => {
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
};

export default InlineMessage;
