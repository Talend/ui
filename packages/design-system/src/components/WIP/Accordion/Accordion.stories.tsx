import React from 'react';

import { TagSuccess } from '../../Tag';

import Accordion from './Accordion';
import CollapsiblePanel from './Primitive/CollapsiblePanel';

export default { component: Accordion };

export const SimpleCollapsiblePanel = () => (
	<div style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
		<CollapsiblePanel a11yId="simpleCollapsible" title="Simple panel">
			<p> this is a test pharagraph</p>
		</CollapsiblePanel>
	</div>
);

export const SimpleAccordion = () => (
	<Accordion>
		<CollapsiblePanel a11yId="SimpleAccordion-p1" title="Simple accordion 1">
			<p> this is a test pharagraph</p>
		</CollapsiblePanel>
		<CollapsiblePanel
			a11yId="SimpleAccordion-p2"
			title="Simple accordion 2"
			action={{ icon: 'plus', tooltip: 'test tooltip', callback: () => window.alert('test') }}
		>
			<p> this is a test pharagraph</p>
		</CollapsiblePanel>
	</Accordion>
);

export const WithMetadata = () => (
	<div style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
		<CollapsiblePanel
			a11yId="WithMetadata"
			title="Simple panel with metadata"
			metadata={['Duration : 3sec', <TagSuccess key="toto">Succes</TagSuccess>]}
			action={{ icon: 'plus', tooltip: 'test tooltip', callback: () => window.alert('test') }}
		>
			<p> this is a test pharagraph</p>
		</CollapsiblePanel>
	</div>
);
