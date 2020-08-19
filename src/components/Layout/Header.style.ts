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

export const HeaderRight = styled.div`
	margin-left: auto;
`;
