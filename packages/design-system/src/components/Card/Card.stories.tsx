import React from 'react';

import Card from './Card';

export default {
	component: Card,
};

export const DefaultCard = (): React.ReactNode => (
	<Card header="Hello!">
		<p>Here lies the card's content</p>
	</Card>
);
