import styled from 'styled-components';

import tokens from '../../tokens';

export type LayoutProps = {
	hasScreenHeight?: boolean;
	hasOverflow?: boolean;
};

export const Layout = styled.div<LayoutProps>`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	flex-basis: 100%;
	${({ hasScreenHeight }) => (hasScreenHeight ? 'height: 100vh;' : '')}
	font-family: ${tokens.fonts.sansSerif};
	${({ hasScreenHeight, hasOverflow }) =>
		!hasScreenHeight || !hasOverflow ? 'overflow: hidden;' : ''}
`;

export const Header = styled.header.attrs({
	role: 'banner',
})`
	min-height: 4.8rem;
`;

export const LayoutGroup = styled.div<LayoutProps>`
	display: flex;
	flex: 1;
	${({ hasOverflow }) => (!hasOverflow ? 'overflow: hidden' : '')}
`;

export const Nav = styled.nav.attrs({
	role: 'navigation',
})`
	display: flex;
	flex-direction: column;
`;

export const Content = styled.div.attrs({})`
	display: flex;
	flex: 1;
`;

export const Main = styled.main.attrs({
	role: 'main',
})<LayoutProps>`
	position: relative;
	flex-shrink: 0;
	flex-basis: 100%;
	display: flex;
	color: ${({ theme }) => theme.colors.textColor};
	background: ${tokens.colors.deepBlue[100]};
	overflow: hidden;
	${({ hasScreenHeight, hasOverflow }) =>
		!hasScreenHeight || !hasOverflow
			? `
		flex-grow: 1; 
		min-height: 0; 
    `
			: ''};
`;

export const Aside = styled.aside``;

export const Footer = styled.footer.attrs({
	role: 'contentinfo',
})`
	display: flex;
	flex: 0;
`;
