import type { ReactNode } from 'react';

import { Card } from '../';

export default {
	component: Card,
};

export const DefaultCard = (): ReactNode => (
	<Card header="Hello!">
		<p>Here lies the card's content</p>
	</Card>
);
