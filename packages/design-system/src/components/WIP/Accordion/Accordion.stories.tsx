import React from 'react';

import Accordion from './Accordion';
import CollapsiblePanel from './Primitive/CollapsiblePanel';

export default { component: Accordion };

export const SimpleCollapsiblePanel = () => (
	<div style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
		<CollapsiblePanel title="Simple panel">
			<p> this is a test pharagraph</p>
		</CollapsiblePanel>
	</div>
);

export const SimpleAccordion = () => (
	<Accordion>
		<CollapsiblePanel title="Simple panel">
			<p> this is a test pharagraph</p>
		</CollapsiblePanel>
		<CollapsiblePanel
			title="Simple panel"
			action={{ icon: 'plus', tooltip: 'test tooltip', callback: () => window.alert('test') }}
		>
			<p> this is a test pharagraph</p>
		</CollapsiblePanel>
	</Accordion>
);
