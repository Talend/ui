import styled from 'styled-components';
import tokens from '../../tokens';

export const Layout = styled.div(
	({ hasScreenHeight, hasOverflow }) => `
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	${hasScreenHeight && 'height: 100vh;'}
	font-family: ${tokens.fonts.sansSerif};
	${(!hasScreenHeight || !hasOverflow) && 'overflow: hidden;'}
`,
);

export const Header = styled.header`
	min-height: 5.5rem;
	color: ${tokens.colors.gray0};
	background: linear-gradient(133deg, ${tokens.colors.deepBlue}, ${tokens.colors.russianViolet});
`;

export const LayoutGroup = styled.div(
	({ hasOverflow }) => `
		display: flex;
		flex: 1; 
		${!hasOverflow && 'overflow: hidden'}
`,
);

export const Aside = styled.aside(({ isAsideCollapsed }) =>`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	flex-basis: ${isAsideCollapsed ? '6rem' : '20rem'};
	color: ${tokens.colors.gray0};
	background: linear-gradient(133deg, ${tokens.colors.deepBlue}, ${tokens.colors.russianViolet});
	transition: flex-basis .3s;
`,
);

export const Main = styled.main(
	({ hasScreenHeight, hasOverflow, theme }) => `
	display: flex;
	flex-direction: column;
	color: ${theme.colors.textColor};
	background: ${tokens.colors.deepBlue100};
		${
			(!hasScreenHeight || !hasOverflow) &&
			`
		flex-grow: 1; 
		align-items: center;
		justify-content: center;
		min-height: 0; 
		overflow: auto;
    `
		};
`,
);

export const Footer = styled.footer`
	display: flex;
	flex: 0;
	
	div, ul {
		display: flex;
	}

	div {
		margin: 0 auto;
	}

	li {
		padding: 0 .5rem;
	}
`;
