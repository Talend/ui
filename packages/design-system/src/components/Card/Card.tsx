import React from 'react';

import { StackVertical } from '../Stack';

import theme from './Card.scss';

interface CardPropsType {
	header: React.ReactNode;
	children: React.ReactNode;
}

function Card({ header, children }: CardPropsType) {
	return (
		<div className={theme.card}>
			<StackVertical gap="L" alignContent="center">
				<div className={theme.card__header}>{header}</div>
				<div className={theme.card__body}>{children}</div>
			</StackVertical>
		</div>
	);
}

export default Card;
