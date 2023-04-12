import type { ReactNode } from 'react';

import { StackVertical } from '../../Stack';

import theme from './Card.module.scss';

interface CardPropsType {
	header?: ReactNode;
	children: ReactNode;
}

function Card({ header, children }: CardPropsType) {
	return (
		<div className={theme.card}>
			<StackVertical gap="L" alignContent="center">
				{header && <header className={theme.card__header}>{header}</header>}
				<div className={theme.card__body}>{children}</div>
			</StackVertical>
		</div>
	);
}

export default Card;
