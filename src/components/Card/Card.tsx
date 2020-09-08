import styled from 'styled-components';

import tokens from '../../tokens';

const Card = styled.div.attrs({
	className: 'card',
})(
	({ theme }) => `
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5rem 2.5rem;
	width: 100vw;
	color: ${theme.colors.textColor};
	background-color: ${theme.colors.backgroundColor};
    border-radius: 6px;
    box-shadow: 0px 0px 3rem -2rem ${tokens.colors.moodyPurple};

	@media only screen and (min-width: 468px) {
		margin: auto;
		padding: 5rem;
		width: 65rem;
		min-height: 60rem;
	}
`,
);

const Heading = styled.div.attrs({
	className: 'card__heading',
})``;

const Body = styled.div.attrs({
	className: 'card__body',
})`
	width: 100%;
	max-width: 36.5rem;
`;

const CardComponent = Card as typeof Card & {
	Heading: typeof Heading;
	Body: typeof Body;
};

CardComponent.Heading = Heading;
CardComponent.Body = Body;

export default CardComponent;
