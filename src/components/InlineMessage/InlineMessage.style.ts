import styled from 'styled-components';

import tokens from '../../tokens';

export type InlineMessageProps = {
	small?: boolean;
	withBackground?: boolean;
};

export const InlineMessage = styled.div.attrs({
	className: 'c-inline-message',
})<InlineMessageProps>`
	display: ${({ withBackground }) => (withBackground ? 'inline-flex' : 'inline')};
	padding: ${({ withBackground }) =>
		withBackground ? `${tokens.space.xs} ${tokens.space.s};` : 'inherit'};
	font-family: ${tokens.fonts.sansSerif};
	font-size: ${({ small }) => (small ? `${tokens.fontSizes.small};` : 'inherit')};
	color: var(--c-inline-message-color, ${({ theme }) => theme.colors?.textColor});
	background: var(--c-inline-message-background, transparent);
	border-radius: ${tokens.radii.inputBorderRadius};
	box-shadow: var(--c-inline-message-box-shadow, transparent);
`;

export const Icon = styled.span.attrs({
	className: 'c-inline-message__icon',
})<InlineMessageProps>`
	padding-right: ${tokens.space.xs};
	color: var(
		--c-inline-message--icon-color,
		${({ theme, withBackground }) =>
			withBackground ? theme.colors?.backgroundColor : theme.colors?.textColor}
	);

	> svg {
		height: ${({ small }) => (small ? tokens.sizes.s : tokens.sizes.l)};
		width: ${({ small }) => (small ? tokens.sizes.s : tokens.sizes.l)};
		// 🎩🐰
		vertical-align: -2px;
	}

	path {
		fill: currentColor;
	}
`;
export const Content = styled.p.attrs({})`
	display: inline;
	margin: 0;
`;
export const Text = styled.span``;
export const Title = styled(Text).attrs({
	className: 'c-inline-message__title',
})`
	font-weight: ${tokens.fontWeights.semiBold};
`;
export const Description = styled(Text).attrs({
	className: 'c-inline-message__description',
})``;
export const Link = styled.span.attrs({
	className: 'c-inline-message__link',
})``;
