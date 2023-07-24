import type { ReactElement } from 'react';
import styles from './Card.module.scss';

const Card = ({
	icon,
	title,
	text,
	link,
}: {
	icon: ReactElement;
	title: string;
	text: string;
	link: ReactElement;
}) => (
	<article className={styles.card}>
		{icon}
		<strong>{title}</strong>
		<p>{text}</p>
		{link}
	</article>
);

export default Card;
