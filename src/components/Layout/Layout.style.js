import styled from 'styled-components';
import tokens from '../../tokens';

export const Layout = styled.div(
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
	role: 'main',
})`
	min-height: 5.5rem;
	color: ${tokens.colors.gray0};
	background: linear-gradient(133deg, ${tokens.colors.deepBlue}, ${tokens.colors.russianViolet});
`;

export const LayoutGroup = styled.div(
	({ hasOverflow }) => `
		position: relative;
		display: flex;
		flex: 1; 
		${!hasOverflow && 'overflow: hidden'}
`,
);

export const Nav = styled.nav.attrs({
	role: 'navigation',
})(
	({ isNavCollapsed }) => `
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	flex-basis: ${isNavCollapsed ? '0' : '20rem'};
	width: ${isNavCollapsed ? '6rem' : 'auto'};
	color: ${tokens.colors.gray0};
	background: linear-gradient(133deg, ${tokens.colors.deepBlue}, ${tokens.colors.russianViolet});
	transition: flex-basis .3s;

	.nav__button {
		color: ${tokens.colors.gray0};
		border: none;
		
		.btn__icon {
			transition: transform 0.1s;
		}

		&--colapsed {
			.btn__icon {
				transform: rotate(180deg);
			}
		}
	}
`,
);

export const Main = styled.main.attrs({
	role: 'main',
})(
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

export const Aside = styled.aside(
	({ theme }) => `
	position: absolute;
	display: flex;
	top: 0;
	right: 0;
	bottom: 0;
	width: 50rem;
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
