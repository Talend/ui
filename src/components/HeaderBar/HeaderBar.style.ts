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
`;
export const Left = styled(HeaderBarArea).attrs({
	className: 'header-bar__area--left',
})`
	margin-right: auto;
`;
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
})`
	max-width: 6rem;

	svg {
		height: ${tokens.sizes.xl};
		width: ${tokens.sizes.xl};
	}
`;
export const LogoFull = styled(HeaderBarItem).attrs({
	className: 'header-bar__logo header-bar__logo--full',
})`
	svg {
		height: ${tokens.sizes.xl};
		width: auto;
	}
`;
export const Brand = styled(HeaderBarItem).attrs({
	className: 'header-bar__brand',
})`
	${borderLeft};
`;
export const Item = styled(HeaderBarItem).attrs({
	className: 'header-bar__item',
})`
	${borderLeft};
`;
export const CTA = styled(HeaderBarItem).attrs({
	className: 'header-bar__cta',
})`
	padding: 0 1.5rem;
	margin-left: auto;

	&,
	&:hover,
	&:focus,
	&:active {
		background: none;
	}
`;
export const IPC = styled(HeaderBarItem).attrs({
	className: 'header-bar__ipc',
})`
	${borderLeft};
`;
export const Notification = styled(HeaderBarItem).attrs({
	className: 'header-bar__notification',
})`
	${borderLeft};
`;
export const Help = styled(HeaderBarItem).attrs({
	className: 'header-bar__help',
})`
	${borderLeft};
`;
export const User = styled(HeaderBarItem).attrs({
	className: 'header-bar__user',
})`
	${borderLeft};
`;
