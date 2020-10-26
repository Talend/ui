import styled from 'styled-components';
import { transparentize } from 'polished';
import tokens from '../../tokens';

export type LayoutProps = {
	hasScreenHeight?: boolean;
	hasOverflow?: boolean;
};

export const Layout = styled.div<LayoutProps>(
	({ hasScreenHeight, hasOverflow }) => `
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	flex-basis: 100%;
	${hasScreenHeight && 'height: 100vh;'}
	font-family: ${tokens.fonts.sansSerif};
	${(!hasScreenHeight || !hasOverflow) && 'overflow: hidden;'}
`,
);

export const Header = styled.header.attrs({
	role: 'banner',
})`
	min-height: 4.8rem;
`;

export const LayoutGroup = styled.div<LayoutProps>(
	({ hasOverflow }) => `
		display: flex;
		flex: 1; 
		${!hasOverflow && 'overflow: hidden'}
`,
);

export const Nav = styled.nav.attrs({
	role: 'navigation',
})<{ isNavCollapsed: boolean }>(
	() => `
	display: flex;
`,
);

export const Main = styled.main.attrs({
	role: 'main',
})<LayoutProps>(
	({ hasScreenHeight, hasOverflow, theme }) => `
	display: flex;
	color: ${theme.colors.textColor};
	background: ${tokens.colors.deepBlue100};
	overflow: hidden;
		${
			(!hasScreenHeight || !hasOverflow) &&
			`
		flex-grow: 1; 
		min-height: 0; 
		overflow: auto;
    `
		};
`,
);

export const AsideOverlay = styled.div`
	position: relative;
	display: flex;
	flex: 1;

	main {
		&:before,
		&:after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}

		&::before {
			pointer-events: none;
		}

		&::after {
			background: ${transparentize(0.3, tokens.colors.gray900)};
			cursor: pointer;
		}
	}
`;

export const Aside = styled.aside(
	({ theme }) => `
	position: absolute;
	display: flex;
	top: 0;
	right: 0;
	bottom: 0;
	width: 50rem;
	max-width: 100vw;
	background: ${theme.colors.backgroundColor};
	box-shadow: -5px 0px 20px 5px ${tokens.colors.gray500};
`,
);

export const Footer = styled.footer.attrs({
	role: 'contentinfo',
})`
	display: flex;
	flex: 0;
`;
