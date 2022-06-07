import React from 'react';

import Card from './Card';

export default {
	component: Card,
};

function CardWrapper({ children }: { children: React.ReactElement }) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: '2rem',
				alignItems: 'center',
				maxWidth: '50rem',
			}}
		>
			{children}
		</div>
	);
}

export const DefaultCard = (): React.ReactElement => (
	<CardWrapper>
		<Card header="Hello!">
			<p>Here lies the card's content</p>
		</Card>
	</CardWrapper>
);
