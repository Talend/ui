import * as React from 'react';
import styled from 'styled-components';

import tokens from '../../tokens';

export const StyledInlineMessage = styled.div`
	${props => props.withBackground || 'display: inline;'}
`;
export const StyledParagraph = styled.p`
	${props => props.icon && props.withBackground && 'padding: 0 0.5rem;'}
`;
export const StyledStrong = styled.strong``;
export const StyledSpan = styled.span``;
export const StyledIconSpan = styled(StyledSpan)`
	margin-right: 0.5rem;

	svg {
		display: inline;
		height: ${tokens.sizes.smaller};
		width: ${tokens.sizes.smaller};

		path {
			fill: currentColor;
		}
	}
`;
export const StyledTextSpan = styled(StyledSpan)`
	${({ theme, withBackground }) =>
		`color: ${withBackground ? tokens.colors.gray900 : theme.colors.textColor};`}
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
						{icon && (
							<>
								<StyledIconSpan withBackground={withBackground}>{icon}</StyledIconSpan>{' '}
							</>
						)}
						{title && (
							<>
								<StyledTextSpan withBackground={withBackground}>{title}</StyledTextSpan>{' '}
							</>
						)}
					</StyledStrong>
				)}
				{description && (
					<>
						<StyledTextSpan withBackground={withBackground}>{description}</StyledTextSpan>{' '}
					</>
				)}
				{link && <StyledTextSpan withBackground={withBackground}>{link}</StyledTextSpan>}
			</StyledParagraph>
		</StyledInlineMessage>
	);
};

export default InlineMessage;
