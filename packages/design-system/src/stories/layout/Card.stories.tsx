import type { ReactNode } from 'react';

import { Card } from '../../';

export default {
	component: Card,
	title: 'Layout/Card',
	argTypes: {
		header: { control: { type: 'text' } },
	},
	args: {
		header: 'Card Header',
	},
};

export const DefaultCard = (props: any): ReactNode => (
	<Card {...props}>
		<p>Here lies the card's content</p>
	</Card>
);
