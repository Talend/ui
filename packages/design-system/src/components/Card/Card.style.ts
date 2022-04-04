import styled from 'styled-components';

import tokens from '../../tokens';

export const Card = styled.div.attrs({
	className: 'card',
})`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5rem 2.5rem;
	width: 100vw;
	color: ${({ theme }) => theme.colors.textColor};
	background-color: ${({ theme }) => theme.colors.backgroundColor};
	border-radius: 6px;
	box-shadow: 0px 0px 3rem -2rem ${tokens.colors.gray[900]};

	@media only screen and (min-width: 468px) {
		margin: auto;
		padding: 5rem;
		width: 65rem;
		min-height: 60rem;
	}
`;

export const Heading = styled.div.attrs({
	className: 'card__heading',
})``;

export const Body = styled.div.attrs({
	className: 'card__body',
})`
	width: 100%;
	max-width: 36.5rem;
`;
