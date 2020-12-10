import {
	Menu as ReakitMenu,
	MenuButton as ReakitMenuButton,
	MenuItem as ReakitMenuItem,
	MenuSeparator as ReakitMenuSeparator,
} from 'reakit';
import styled from 'styled-components';
import Icon from '../Icon';
import tokens from '../../tokens';

export const Button = ReakitMenuButton;

export const ButtonIcon = styled(Icon).attrs({
	className: 'dropdown__icon',
})`
	&.dropdown__icon {
		display: inline-flex;
		height: ${tokens.sizes.xs};
		width: ${tokens.sizes.xs};
		fill: currentColor;
		transition: transform ${tokens.transitions.fast};

		[aria-expanded='true'] & {
			transform: rotate(-180deg);
		}

		[role='menuitem'] & {
			margin-left: auto;
			transform: rotate(-90deg);
		}

		[role='menuitem'][aria-expanded='true'] & {
			transform: rotate(90deg);
		}
	}
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
	transition: opacity ${tokens.transitions.normal};

	[data-enter] & {
		opacity: 1;
	}
`,
);

export const MenuSeparator = styled(ReakitMenuSeparator)`
	margin: 0;
	width: 100%;
`;

export const MenuItem = styled(ReakitMenuItem)(
	({ theme }) => `
	display: flex;
	padding: ${tokens.space.s} ${tokens.space.m};
	color: ${theme.colors.textColor};
	text-align: start;
	white-space: nowrap;
    text-overflow: ellipsis;
	overflow: hidden;
	cursor: pointer;
`,
);
