import styled from 'styled-components';
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
	border-left: 1px solid white;
`;
const HeaderItem = styled.span.attrs({
	className: 'header__item',
})`
	padding: 0 1.5rem;
`;
export const Logo = styled(HeaderItem).attrs({
	className: 'header__logo',
})`
	margin-right: 1.5rem;
	max-width: 4.5rem;

	svg {
		height: ${tokens.sizes.xl};
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
