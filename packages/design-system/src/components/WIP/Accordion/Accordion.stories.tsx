import React from 'react';
import { Story } from '@storybook/react';

import { TagSuccess } from '../../Tag';

import Accordion from './Accordion';
import CollapsiblePanel from './Primitive/CollapsiblePanel';
import { StackVertical } from '../../Stack';

export default { component: Accordion };

const SampleParagraph = () => (
	<p>
		Quisque efficitur, magna sit amet tempor malesuada, orci mauris vestibulum enim, quis gravida
		est urna et ipsum. Nunc rutrum, magna id fermentum dignissim, magna sem volutpat risus, ut
		ultrices ipsum lacus vitae sapien. Curabitur sodales risus ac nibh efficitur, dapibus posuere
		ipsum bibendum. Proin erat ipsum, tempus in aliquet sed, auctor id sem. Maecenas ultrices, magna
		vitae pretium condimentum, ipsum lectus hendrerit est, a ultrices lacus odio in mi. Phasellus
		accumsan diam in metus dictum ultrices. In hac habitasse platea dictumst. Curabitur vestibulum
		vitae libero sit amet blandit. Nulla bibendum sollicitudin dolor at vehicula. Morbi quis viverra
		velit, eget ornare velit. Praesent porttitor sagittis nulla non vehicula. u
	</p>
);

export const SimpleCollapsiblePanel = () => (
	<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
		<CollapsiblePanel title="Simple panel">
			<SampleParagraph />
		</CollapsiblePanel>
	</div>
);

export const DisabledPanel = {
	render: (props: Story) => (
		<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
			<CollapsiblePanel
				{...props}
				id="disabled-panel"
				title="disabled panel"
				action={{
					icon: 'plus',
					tooltip: 'action tooltip',
					callback: () => window.alert('action callback'),
				}}
				disabled
			>
				<SampleParagraph />
			</CollapsiblePanel>
		</div>
	),
};

export const SmallPanel = () => (
	<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
		<CollapsiblePanel title="small panel" size="S">
			<SampleParagraph />
		</CollapsiblePanel>
	</div>
);

export const WithMetadata = () => (
	<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
		<StackVertical gap={'S'} align="stretch">
			<CollapsiblePanel
				title="Simple panel with several metadata"
				metadata={['Duration : 3sec', <TagSuccess key="successTag">Success</TagSuccess>]}
			>
				<SampleParagraph />
			</CollapsiblePanel>
			<CollapsiblePanel
				title="Simple panel with several metadata and action"
				metadata={['Duration : 3sec', <TagSuccess key="successTag">Succes</TagSuccess>]}
				action={{
					icon: 'plus',
					tooltip: 'action tooltip',
					callback: () => window.alert('action callback'),
				}}
			>
				<SampleParagraph />
			</CollapsiblePanel>
			<CollapsiblePanel title="simple panel with one metadata" metadata={['Duration : 3sec']}>
				<SampleParagraph />
			</CollapsiblePanel>
		</StackVertical>
	</div>
);

export const WithAction = {
	render: (props: Story) => (
		<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
			<CollapsiblePanel
				{...props}
				id="panel-with-action"
				title="panel with action"
				action={{
					icon: 'plus',
					tooltip: 'action tooltip',
					callback: () => window.alert('action callback'),
				}}
			>
				<SampleParagraph />
			</CollapsiblePanel>
		</div>
	),
};

export const AccordionWrapper = {
	render: (props: Story) => (
		<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
			<Accordion {...props}>
				<CollapsiblePanel id="panel-a" title="first panel">
					<SampleParagraph />
				</CollapsiblePanel>
				<CollapsiblePanel id="panel-b" title="second panel">
					<SampleParagraph />
				</CollapsiblePanel>
				<CollapsiblePanel id="panel-c" title="third panel">
					<SampleParagraph />
				</CollapsiblePanel>
			</Accordion>
		</div>
	),
};

export const GroupOfSimplePanels = () => (
	<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
		<StackVertical gap={'S'} align="stretch">
			<CollapsiblePanel title="first panel">
				<SampleParagraph />
			</CollapsiblePanel>
			<CollapsiblePanel title="second panel">
				<SampleParagraph />
			</CollapsiblePanel>
			<CollapsiblePanel title="third panel">
				<SampleParagraph />
			</CollapsiblePanel>
		</StackVertical>
	</div>
);
