import styled from 'styled-components';

import tokens from '../../tokens';

export type InlineMessageProps = {
	small?: boolean;
	withBackground?: boolean;
};

export const InlineMessage = styled.div<InlineMessageProps>`
	display: ${({ withBackground }) => (withBackground ? 'inline-flex' : 'inline')};
	margin-bottom: ${tokens.space?.m};
	${({ withBackground }) =>
		withBackground ? `padding: ${tokens.space?.xs} ${tokens.space?.s};` : ''}
	font-family: ${tokens.fonts?.sansSerif};
	${({ small }) => (small ? `font-size: ${tokens.fontSizes?.small};` : '')}
	border-radius: ${tokens.radii?.inputBorderRadius};

	color: var(
		--t-inline-message-icon-color,
		${({ theme, withBackground }) =>
			withBackground ? theme.colors?.backgroundColor : theme.colors?.textColor}
	);
	background: var(--t-inline-message-background, transparent);
	box-shadow: var(--t-inline-message-box-shadow, transparent);

	.inline-message__icon {
		padding-right: ${tokens.space?.xs};

		svg {
			height: ${({ small }) => (small ? tokens.sizes?.s : tokens.sizes?.l)};
			width: ${({ small }) => (small ? tokens.sizes?.s : tokens.sizes?.l)};
		}

		path {
			fill: currentColor;
		}
	}

	.inline-message__icon,
	p {
		vertical-align: middle;
	}

	p {
		display: inline;
		margin: 0;
	}

	.inline-message__title {
		font-weight: ${tokens.fontWeights?.semiBold};
	}

	.inline-message__title,
	.inline-message__description {
		color: var(--t-inline-message-color, ${({ theme }) => theme.colors?.textColor});
	}
`;
