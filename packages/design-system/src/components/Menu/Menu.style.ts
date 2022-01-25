import styled from 'styled-components';
import { transparentize } from 'polished';
import DSTokens from '@talend/design-tokens';

import Link from '../Link';

import tokens from '../../tokens';
import { StyledLink } from '../Link/Link';

export const Nav = styled.nav.attrs({
	className: 'c-menu',
})<{ isCollapsed: boolean; variant: string }>`
	position: relative;
	flex: 0 1 auto;
	min-width: ${({ isCollapsed }) => (isCollapsed ? '6rem' : '20rem')};
	max-width: ${({ isCollapsed }) => (isCollapsed ? '6rem' : '40rem')};
	min-height: 100%;
	color: ${tokens.colors.gray[0]};
	background: ${tokens.colors.twilight.backgroundImage};
	transition: min-width ${tokens.transitions.normal}, max-width ${tokens.transitions.normal};
	overflow: hidden;

	${({ isCollapsed }) =>
		!isCollapsed &&
		`
		&:before {
			position: absolute;
			content: '';
			height: 29rem;
			width: 29rem;
			left: 0;
			bottom: -6rem;
			background-color: ${({ variant = '' }) =>
				variant !== '' ? tokens.colors.gray[0] : tokens.colors.transparent};
    		opacity: ${tokens.opacity.shade};
		}`}
`;

// With CSS module, replace this with two buttons that build on ButtonIconPrimitive
export const NavButton = styled('span')`
	flex: 0;

	.nav__button {
		align-self: start;
		margin: 1.5rem;
		border: none;
		background: transparent;
		border: 0;
		cursor: pointer;
		border-radius: 100%;
	}

	.nav__button,
	.nav__button:hover,
	.nav__button:active {
		color: inherit;
		background: none;
	}

	.nav__button-icon {
		display: inline-block;
		transform: translateZ(0) rotate(0deg);
		transition: transform ${tokens.transitions.fast};

		> svg {
			width: ${DSTokens.coralSizeS};
			height: ${DSTokens.coralSizeS};
		}
	}

	.nav__button--collapsed {
		.nav__button-icon {
			transform: translateZ(0) rotate(-180deg);
		}
	}
`;

export const Menu = styled.div`
	transform: translateZ(0);

	ul {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
	}

	li {
		width: 100%;
		padding: 0.5rem 1rem;
		min-width: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`;

export const MenuItem = styled(Link).attrs(({ active }: StyledLink & { active: boolean }) => ({
	'aria-current': active ? 'page' : null,
}))`
	display: flex;
	padding: 0.5rem 1rem;
	color: ${({ active }) => (active ? tokens.colors.deepBlue[500] : 'inherit')};
	background: ${({ active }) => (active ? tokens.colors.gray[0] : 'none')};
	border-radius: ${tokens.radii.rectRadius};
	min-width: 0;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	cursor: pointer;

	.link__icon {
		height: 2rem;
		width: 2rem;
		margin-right: 1rem;
		overflow: visible;
	}

	.link__text {
		font-weight: ${tokens.fontWeights.semiBold};
		min-width: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		border: none !important;
	}

	&:hover {
		color: ${
			// @ts-ignore
			({ active, theme }) => (active ? theme.colors.primaryColor : 'inherit')
		};
		background: ${({ active }) => transparentize(active ? 0.12 : 0.88, tokens.colors.gray[0])};
	}
`;
