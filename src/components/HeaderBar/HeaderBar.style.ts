import styled from 'styled-components';
import { transparentize } from 'polished';

import tokens from '../../tokens';

const borderLeft = () => `
	position: relative;

	&:before {
		position: absolute;
		content: '';
		width: 1px;
		height: 1.5rem;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		background: ${tokens.colors.gray0};
	}
`;
export const HeaderBar = styled.div.attrs({
	className: 'header-bar',
})`
	display: flex;
	align-items: center;
	width: 100%;
	min-height: 4.8rem;
	color: ${tokens.colors.gray0};
	background: linear-gradient(133deg, ${tokens.colors.deepBlue}, ${tokens.colors.russianViolet});
`;
const HeaderBarArea = styled.div.attrs({
	className: 'header-bar__area',
})`
	display: flex;
	min-height: 4.8rem;

	@media only screen and (max-width: 995px) {
		flex-direction: column;
		flex: 0 0 auto;
		margin: 0;
	}
`;
export const Left = styled(HeaderBarArea).attrs({
	className: 'header-bar__area--left',
})``;
export const Right = styled(HeaderBarArea).attrs({
	className: 'header-bar__area--right',
})`
	margin-left: auto;
`;
const HeaderBarItem = styled.span.attrs({
	className: 'header-bar__item',
})`
	&,
	> .link,
	> .btn:not(.btn--small),
	> .text {
		display: inline-flex;
		align-items: center;
		height: 4.8rem;
	}

	> .link,
	> .btn:not(.btn--small),
	> .text {
		padding: 0 1.5rem;
		transition: all 0.2s ease-out;

		&,
		&:hover,
		&:focus,
		&:active {
			color: ${tokens.colors.gray0};
		}
	}

	.btn:not(.btn--small) {
		border: none;
		border-radius: 0;
	}

	&:hover {
		.link__text {
			text-decoration: none;
		}
	}

	&:hover {
		background: ${transparentize(0.8, tokens.colors.gray0)};
	}

	&:active {
		background: ${transparentize(0.9, tokens.colors.gray0)};
	}

	[role='menuitem'] {
		padding: 0.5rem 1rem;

		&:hover,
		&:focus {
			color: ${tokens.colors.gray900};
			background: ${tokens.colors.paleCyan100};
		}
	}
`;
export const Logo = styled(HeaderBarItem).attrs({
	className: 'header-bar__logo',
})<{ full: boolean }>(
	({ full }) => `
	max-width: ${full ? 'auto' : '6rem'};

	svg {
		height: ${tokens.sizes.xl};
		width: ${full ? 'auto' : tokens.sizes.xl};
	}
`,
);
export const Brand = styled(HeaderBarItem).attrs({
	className: 'header-bar__brand',
})`
	${borderLeft};

	@media only screen and (max-width: 995px) {
		flex: 1;
	}
`;
export const MenuDisclosure = styled(HeaderBarItem).attrs({
	className: 'header-bar__menu-disclosure',
})`
	margin-left: auto;
	display: none !important;
	overflow: hidden;

	.menu {
		rect {
			transform-origin: 50% 50%;
			transition: transform 0.2s ease-out;
		}

		&:hover {
			background: ${transparentize(0.8, tokens.colors.gray0)};
		}

		&:active {
			background: ${transparentize(0.9, tokens.colors.gray0)};
		}

		&--opened {
			position: fixed;
			top: 0;
			right: 0;
			z-index: 1;

			rect {
				transform: scaleX(0);

				&:first-child {
					transform: translate(-5px, 5px) rotate(45deg);
				}

				&:last-child {
					transform: translate(-5px, -5px) rotate(-45deg);
				}
			}
		}
	}

	@media only screen and (max-width: 995px) {
		display: inline-flex !important;
	}
`;
export const Menu = styled.div.attrs({
	className: 'header-bar__menu',
})<{ visible: boolean }>(
	({ visible }) => `
	display: flex;
	flex: 1;

	@media only screen and (max-width: 995px) {
		${visible || 'display: none'};
		flex-direction: column;
		position: fixed;
		padding-top: 5rem;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		height: 100vh;
		width: 100vw;
		background: linear-gradient(133deg, ${tokens.colors.deepBlue}, ${tokens.colors.russianViolet});
	}
`,
);
export const Item = styled(HeaderBarItem).attrs({
	className: 'header-bar__item',
})``;
export const CTA = styled(HeaderBarItem).attrs({
	className: 'header-bar__cta',
})`
	padding: 0 1.5rem;

	&,
	&:hover,
	&:focus,
	&:active {
		background: none;
	}
`;
export const IPC = styled(HeaderBarItem).attrs({
	className: 'header-bar__ipc',
})``;
export const Notifications = styled(HeaderBarItem).attrs({
	className: 'header-bar__notifications',
})``;
export const Help = styled(HeaderBarItem).attrs({
	className: 'header-bar__help',
})``;
export const User = styled(HeaderBarItem).attrs({
	className: 'header-bar__user',
})``;
