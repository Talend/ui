import styled from 'styled-components';
import { hideVisually, transparentize } from 'polished';
import Button from '../Button';
import tokens from '../../tokens';

const borderLeft = () => `
	position: relative;

	&:before {
		position: absolute;
		content: '';
		width: .1rem;
		height: 1.5rem;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		background: ${tokens.colors.gray[0]};
	}
`;

export const HeaderBar = styled.div.attrs({
	className: 'header-bar',
})`
	display: flex;
	min-height: 4.8rem;
	width: 100%;
	color: ${tokens.colors.gray[0]};
	background: ${tokens.colors.twilight.backgroundImage};
`;
export const Item = styled.span.attrs({
	className: 'header-bar__item',
})<{ freeze?: boolean }>`
	padding: 0 1.5rem;
	transition: ${tokens.transitions.fast};

	&:hover {
		background: ${({ freeze }) => (freeze ? 'none' : transparentize(0.8, tokens.colors.gray[0]))};
	}

	&:active {
		background: ${({ freeze }) => (freeze ? 'none' : transparentize(0.9, tokens.colors.gray[0]))};
	}

	&,
	> .link,
	> .btn:not(.btn--small),
	> .text {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 4.8rem;
	}

	> .link,
	> .btn:not(.btn--small),
	> .text {
		padding: 0;

		&,
		&:hover,
		&:focus,
		&:active {
			color: ${tokens.colors.gray[0]};
		}
	}

	.btn:not(.btn--small) {
		border: none;
		border-radius: 0;
	}

	.link:hover {
		.link__text {
			text-decoration: none;
		}
	}

	[role='menuitem'] {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;

		&:hover,
		&:focus,
		&:active {
			color: ${tokens.colors.gray[900]};
			background: ${tokens.colors.paleCyan[100]};
		}
	}

	@media only screen and (max-width: ${tokens.breakpoints.l}) {
		flex-direction: column;
		align-items: start;
	}
`;
export const Logo = styled(Item).attrs({
	className: 'header-bar__logo',
})<{ full: boolean }>`
	svg {
		height: ${tokens.sizes.xl};
		width: ${({ full }) => (full ? '6rem' : tokens.sizes.xl)};
		vertical-align: middle;
	}
`;
export const Brand = styled(Item).attrs({
	className: 'header-bar__brand',
})`
	flex: 1 0 auto;
	${borderLeft}

	> .btn {
		width: 100%;
	}

	@media only screen and (min-width: ${tokens.breakpoints.l}) {
		flex-grow: 0;
	}
`;
export const MenuDisclosure = styled(Button).attrs({
	className: 'header-bar__menu-disclosure',
})`
	margin-left: auto;
	padding: 1.5rem;
	min-height: 4.8rem;
	border: none;
	border-radius: 0;
	overflow: hidden;

	&,
	&:hover,
	&:focus,
	&:active {
		color: ${tokens.colors.gray[0]};
	}

	&:hover {
		background: ${transparentize(0.8, tokens.colors.gray[0])};
	}

	&:active {
		background: ${transparentize(0.9, tokens.colors.gray[0])};
	}

	&.btn {
		.btn__icon {
			margin: 0;
		}
		.btn__text {
			${hideVisually()};
		}
	}

	rect {
		transform-origin: 50% 50%;
		transition: transform ${tokens.transitions.fast};
	}

	&[aria-expanded='true'] {
		position: fixed;
		top: 0;
		right: 0;
		z-index: ${tokens.zIndices.onTop};

		rect {
			transform: scaleX(0);

			&:first-child {
				transform: translate(-0.5rem, 0.5rem) rotate(45deg);
			}

			&:last-child {
				transform: translate(-0.5rem, -0.5rem) rotate(-45deg);
			}
		}
	}
`;
export const Menu = styled.div.attrs({
	className: 'header-bar__menu',
})`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	padding-top: 5rem;
	height: 100vh;
	width: 100vw;
	background: ${tokens.colors.twilight.backgroundImage};
	opacity: ${tokens.opacity.transparent};
	overflow: auto;
	z-index: ${tokens.zIndices.above};
	transition: opacity ${tokens.transitions.fast};

	&[data-enter] {
		opacity: ${tokens.opacity.opaque};
	}

	[role='menu'] {
		margin-left: 4rem;
		position: static !important;
		transform: none !important;

		> * {
			max-width: none;
			background: none;
			box-shadow: none;
		}
	}

	[role='menuitem'] {
		min-height: 4.8rem;
		color: ${tokens.colors.gray[0]};
	}
`;
const ContentArea = styled.div.attrs({
	className: 'header-bar__content',
})`
	display: flex;
	flex: 0 0 auto;

	@media only screen and (max-width: ${tokens.breakpoints.l}) {
		flex-direction: column;
	}
`;
export const ContentLeft = styled(ContentArea).attrs({
	className: 'header-bar__content--left',
})`
	@media only screen and (min-width: ${tokens.breakpoints.l}) {
		${Item} {
			${borderLeft}
		}
	}
`;
export const ContentRight = styled(ContentArea).attrs({
	className: 'header-bar__content--right',
})`
	.btn--is-active {
		&,
		&:focus,
		&:hover,
		&:active {
			color: ${tokens.colors.gray[0]};
			background: none;
			border: none;
		}
	}

	// Display Toggle labels for mobiles and tablets
	.btn__text--hidden {
		position: static;
		clip: none;
		height: auto;
		width: auto;
	}

	@media only screen and (min-width: ${tokens.breakpoints.l}) {
		margin-left: auto;

		${Item} + ${Item} {
			${borderLeft}
		}

		.btn__text--hidden {
			${hideVisually()};
		}
	}
`;
