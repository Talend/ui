import { StoryObj } from '@storybook/react';

import {
	Accordion,
	CollapsiblePanel,
	CollapsiblePanelProps,
	StackVertical,
	TagSuccess,
} from '../../';

export default {
	component: Accordion,
	title: 'Navigation/Accordion',
};

type Story = StoryObj<typeof Accordion>;

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

export const SimpleCollapsiblePanel = (props: CollapsiblePanelProps) => (
	<div style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '1.875rem' }}>
		<CollapsiblePanel {...props}>
			<SampleParagraph />
		</CollapsiblePanel>
	</div>
);
SimpleCollapsiblePanel.args = {
	id: 'simple-panel',
	title: 'simple panel',
};
SimpleCollapsiblePanel.argTypes = {
	id: { control: { type: 'text' } },
	title: { control: { type: 'text' } },
	status: {
		control: { type: 'select' },
		options: ['successful', 'failed', 'inProgress', 'warning', 'canceled'],
	},
	disabled: { control: { type: 'boolean' } },
};

export const StatusCollapsiblePanel = () => (
	<div style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '1.875rem' }}>
		<CollapsiblePanel status="successful">
			<SampleParagraph />
		</CollapsiblePanel>
		<CollapsiblePanel status="failed">
			<SampleParagraph />
		</CollapsiblePanel>
		<CollapsiblePanel status="inProgress">
			<SampleParagraph />
		</CollapsiblePanel>
		<CollapsiblePanel status="warning">
			<SampleParagraph />
		</CollapsiblePanel>
		<CollapsiblePanel status="canceled">
			<SampleParagraph />
		</CollapsiblePanel>
	</div>
);

export const DisabledPanel = {
	render: (props: Story) => (
		<div
			style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '1.875rem' }}
		>
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
	<div style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '1.875rem' }}>
		<CollapsiblePanel title="small panel" size="S">
			<SampleParagraph />
		</CollapsiblePanel>
	</div>
);

export const WithMetadata = () => (
	<div style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '1.875rem' }}>
		<StackVertical gap={'S'} align="stretch">
			<CollapsiblePanel
				title="Simple panel with several metadata"
				metadata={['Duration : 3sec', <TagSuccess key="successTag">Success</TagSuccess>]}
			>
				<SampleParagraph />
			</CollapsiblePanel>
			<CollapsiblePanel
				title="Simple panel with several metadata and action"
				metadata={['Duration : 3sec', <TagSuccess key="successTag">Success</TagSuccess>]}
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

export const WithActions = {
	render: (props: Story) => (
		<div
			style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '1.875rem' }}
		>
			<CollapsiblePanel
				{...props}
				id="panel-with-actions"
				title="panel with actions"
				action={[
					{
						icon: 'talend-cog',
						tooltip: 'action tooltip',
						callback: () => window.alert('action callback'),
					},
					{
						icon: 'plus',
						tooltip: 'action tooltip',
						callback: () => window.alert('action callback'),
					},
				]}
			>
				<SampleParagraph />
			</CollapsiblePanel>
		</div>
	),
};

export const AccordionWrapper = {
	render: (props: Story) => (
		<div
			style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '1.875rem' }}
		>
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
	<div style={{ maxWidth: '50rem', marginLeft: 'auto', marginRight: 'auto', padding: '1.875rem' }}>
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
