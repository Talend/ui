import {
	Menu as ReakitMenu,
	MenuButton as ReakitMenuButton,
	MenuItem as ReakitMenuItem,
} from 'reakit/Menu';
import styled from 'styled-components';
import Icon from '../Icon';
import tokens from '../../tokens';

export const Button = ReakitMenuButton;

export const ButtonIcon = styled(Icon)`
	display: inline-block;
	height: ${tokens.sizes.xs};
	width: ${tokens.sizes.xs};
	fill: currentColor;
`;

export const Menu = styled(ReakitMenu)`
	z-index: ${tokens.zIndices.dropdowns};
`;

export const AnimatedMenu = styled.div(
	({ theme }) => `
	display: flex;
	flex-direction: column;
	padding: ${tokens.space.xs} ${tokens.space.none};
	min-width: 15rem;
	max-width: 25rem;
	background: ${theme.colors.backgroundColor};
	border-radius: ${tokens.radii.rectRadius};
	border: 0;
	box-shadow: 0 2px 4px 0 ${tokens.colors.gray300};
	opacity: 0;
	transition: opacity 250ms ease-in-out;

	[data-enter] & {
		opacity: 1;
	}
`,
);

export const MenuItem = styled(ReakitMenuItem)(
	({ theme }) => `
	display: block;
	padding: ${tokens.space.s} ${tokens.space.m};
	color: ${theme.colors.textColor};
	text-align: start;
	cursor: pointer;
	white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`,
);
