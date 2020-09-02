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

	img {
		height: 3.2rem;
		margin-bottom: 1rem;
	}
	strong {
		margin-bottom: 0.5rem;
	}
	p {
		text-align: center;
		margin-bottom: 1rem;
	}
	a {
	}
`;

const Card = ({ icon, title, text, link }) => (
	<SCard>
		{icon}
		<strong>{title}</strong>
		<p>{text}</p>
		{link}
	</SCard>
);

export default Card;
