import styled from 'styled-components';
import tokens from '../../tokens';

export const Layout = styled.div(
	({ hasScreenHeight, hasOverflow }) => `
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	${hasScreenHeight && 'height: 100vh;'}
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

export const Aside = styled.aside`
	display: flex;
	flex-shrink: 0;
	flex-basis: 20rem;
	color: ${tokens.colors.gray0};
	background: linear-gradient(133deg, ${tokens.colors.deepBlue}, ${tokens.colors.russianViolet});
`;

export const Main = styled.main(
	({ hasScreenHeight, hasOverflow, theme }) => `
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	background: ${tokens.colors.deepBlue100};
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

export const Footer = styled.footer`
	display: flex;
`;
