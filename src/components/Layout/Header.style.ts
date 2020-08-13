import styled from 'styled-components';
import tokens from '../../tokens';

export const Header = styled.div`
	display: flex;
	align-items: center;
	padding: ${tokens.space.none} ${tokens.space.m};
	height: 5.5rem;
	width: 100%;

	.header__logo svg {
		height: ${tokens.sizes.xxl};
		margin-right: 1.5rem;
	}
`;
