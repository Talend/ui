import {
	Menu as ReakitMenu,
	MenuButton as ReakitMenuButton,
	MenuItem as ReakitMenuItem,
	MenuSeparator as ReakitMenuSeparator,
} from 'reakit';
import styled from 'styled-components';
import { Icon } from '../Icon';
import tokens from '../../tokens';

export const Button = ReakitMenuButton;

export const ButtonIcon = styled(Icon).attrs({
	className: 'dropdown__icon',
	currentColor: true,
})`
	&.dropdown__icon {
		display: inline-flex;
		margin-left: 1rem;
		height: ${tokens.sizes.xs};
		width: ${tokens.sizes.xs};
		vertical-align: middle;
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
	z-index: ${tokens.zIndices.dropdown};
`;

export const AnimatedMenu = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${tokens.space.xs} ${tokens.space.none};
	min-width: 15rem;
	max-width: 25rem;
	background: ${({ theme }) => theme.colors.backgroundColor};
	border-radius: ${tokens.radii.rectRadius};
	border: 0;
	box-shadow: 0 2px 4px 0 ${tokens.colors.gray300};
	opacity: ${tokens.opacity.transparent};
	transition: opacity ${tokens.transitions.normal};

	[data-enter] & {
		opacity: ${tokens.opacity.opaque};
	}
`;

export const MenuSeparator = styled(ReakitMenuSeparator)`
	margin: 0;
	width: 100%;
`;

export const MenuItem = styled(ReakitMenuItem)`
	display: flex;
	padding: ${tokens.space.s} ${tokens.space.m};
	color: ${({ theme }) => theme.colors.textColor};
	text-align: start;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	cursor: pointer;

	.link__text {
		border: none !important;
	}
`;
