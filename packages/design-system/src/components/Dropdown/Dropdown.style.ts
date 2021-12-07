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
	max-height: 32rem;
	overflow: auto;
	padding: ${tokens.space.none};
	min-width: 15rem;
	max-width: 25rem;
	background: ${({ theme }) => theme.colors.dropdownBackgroundColor};
	border-radius: ${tokens.radii.rectRadius};
	border: 0;
	box-shadow: ${tokens.shadows.onTop};
	opacity: ${tokens.opacity.transparent};
	transition: opacity ${tokens.transitions.normal};

	[data-enter] & {
		opacity: ${tokens.opacity.opaque};
	}
`;

export const MenuSeparator = styled(ReakitMenuSeparator)`
	margin: 0;
	width: 100%;
	border-left: none;
	border-bottom: none;
	border-color: ${({ theme }) => theme.colors.dropdownSeparatorColor};
`;

export const MenuItem = styled(ReakitMenuItem)`
	display: flex;
	align-items: center;
	justify-content: start;
	width: 100%;
	min-height: ${tokens.sizes.xxl};
	padding: ${tokens.space.none} ${tokens.space.s};
	color: ${({ theme }) => theme.colors.dropdownColor};

	// Bootstrap
	& {
		white-space: normal;
		text-align: start;
	}

	&:hover,
	&:focus {
		color: ${({ theme }) => theme.colors.dropdownColor};
		background-color: ${({ theme }) => theme.colors.dropdownHoverBackgroundColor};
	}

	&:active {
		background-color: ${({ theme }) => theme.colors.dropdownActiveBackgroundColor};
	}

	.btn__text,
	.link__text {
		justify-content: start;
		font-weight: ${tokens.fontWeights.normal};
		border: none;
	}

	> svg:first-child {
		margin-bottom: 0;
		width: ${tokens.sizes.l};
		height: ${tokens.sizes.l};
	}
`;
