import * as React from 'react';
import styles from './Card.module.scss';

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
	<article className={styles.card}>
		{icon}
		<strong>{title}</strong>
		<p>{text}</p>
		{link}
	</article>
);

export default Card;
