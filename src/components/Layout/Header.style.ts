import styled from 'styled-components';
import { transparentize } from 'polished';
import tokens from '../../tokens';

export const Header = styled.div.attrs({
	className: 'header',
})`
	display: flex;
	align-items: center;
	height: 5.5rem;
	width: 100%;
`;
const borderLeft = props => `
	> .link,
	> .btn {
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
	}
`;
const HeaderItem = styled.span.attrs({
	className: 'header__item',
})`
	&,
	> .link,
	> .btn {
		display: inline-flex;
		align-items: center;
		height: 100%;
	}

	> .link,
	> .btn {
		padding: 0 1.5rem;
		transition: all 0.2s ease-out;

		&,
		&:hover,
		&:focus,
		&:active {
			color: ${tokens.colors.gray0};
		}

		&:hover {
			background: ${transparentize(0.8, tokens.colors.gray0)};
		}

		&:active {
			background: ${transparentize(0.9, tokens.colors.gray0)};
		}
	}

	.btn {
		border: none;
		border-radius: none;
	}

	&:hover {
		.link__text {
			text-decoration: none;
		}
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
export const Brand = styled(HeaderItem).attrs({
	className: 'header__brand',
})`
	${borderLeft};
`;
export const Help = styled(HeaderItem).attrs({
	className: 'header__help',
})`
	margin-left: auto;
`;
export const User = styled(HeaderItem).attrs({
	className: 'header__user',
})`
	${borderLeft};
`;
