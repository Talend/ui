import styled from 'styled-components';
import { transparentize } from 'polished';
import tokens from '../../tokens';

export const Header = styled.div.attrs({
	className: 'header',
})`
	display: flex;
	align-items: center;
	min-height: 4.8rem;
	width: 100%;
`;
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
const HeaderItem = styled.span.attrs({
	className: 'header__item',
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

export const Logo = styled(HeaderItem).attrs({
	className: 'header__logo',
})`
	max-width: 6rem;

	svg {
		height: ${tokens.sizes.xl};
		width: ${tokens.sizes.xl};
	}
`;
export const LogoFull = styled(HeaderItem).attrs({
	className: 'header__logo header__logo--full',
})`
	svg {
		height: ${tokens.sizes.xl};
	}
`;
export const Brand = styled(HeaderItem).attrs({
	className: 'header__brand',
})`
	${borderLeft};
`;
export const Item = styled(HeaderItem).attrs({
	className: 'header__item',
})`
	${borderLeft};
`;
export const CTA = styled(HeaderItem).attrs({
	className: 'header__cta',
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
export const IPC = styled(HeaderItem).attrs({
	className: 'header__ipc',
})`
	${borderLeft};
`;
export const Notification = styled(HeaderItem).attrs({
	className: 'header__notification',
})`
	${borderLeft};
`;
export const Help = styled(HeaderItem).attrs({
	className: 'header__help',
})`
	${borderLeft};
`;
export const User = styled(HeaderItem).attrs({
	className: 'header__user',
})`
	${borderLeft};
`;
