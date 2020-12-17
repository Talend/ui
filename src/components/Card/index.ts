import * as S from './Card.style';

const CardComponent = S.Card as typeof S.Card & {
	Heading: typeof S.Heading;
	Body: typeof S.Body;
};

CardComponent.Heading = S.Heading;
CardComponent.Body = S.Body;

export default CardComponent;
