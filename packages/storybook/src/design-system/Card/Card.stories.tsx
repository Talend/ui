import type { ReactNode } from 'react';

import { Card } from '@talend/design-system';

export default {
	component: Card,
};

export const DefaultCard = (): ReactNode => (
	<Card header="Hello!">
		<p>Here lies the card's content</p>
	</Card>
);
