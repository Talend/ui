import React from 'react';
import styled from 'styled-components';

const SCard = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	border-radius: 0.4rem;
	box-shadow: 0 0.2rem 1rem 0 rgba(0, 0, 0, 0.15);

	svg {
		height: 3.2rem;
		margin-bottom: 1rem;
	}
	strong {
		margin-bottom: 0.5rem;
		font-size: 1.6rem;
		font-weight: 700;
	}
	p {
		margin-top: 0;
		margin-bottom: 1rem;
		text-align: center;
	}
	a {
		font-weight: 600;
	}
`;

const Card = ({
	icon,
	title,
	text,
	link,
}: {
	icon: React.ReactElement;
	title: string;
	text: string;
	link: React.ReactElement;
}) => (
	<SCard>
		{icon}
		<strong>{title}</strong>
		<p>{text}</p>
		{link}
	</SCard>
);

export default Card;
