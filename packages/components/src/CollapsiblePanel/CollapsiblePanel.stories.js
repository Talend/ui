import { action } from '@storybook/addon-actions';

import CollapsiblePanel from './CollapsiblePanel.component';
import { ActionButton } from '../Actions';

const keyValueContent = [
	{
		label: 'Content1',
		description: 'Description1',
	},
	{
		label: 'Content2',
		description: 'Description2',
	},
];

const statusSuccessfulHeader = [
	{
		displayMode: 'status',
		status: 'successful',
		label: 'Successful',
		icon: 'talend-check',
	},
];
const statusFailedHeader = [
	{
		displayMode: 'status',
		status: 'failed',
		label: 'Failed',
		icon: 'talend-cross',
	},
];
const statusWarningHeader = [
	{
		displayMode: 'status',
		status: 'warning',
		label: 'Warning',
		icon: 'talend-warning',
	},
];
const statusCanceledHeader = [
	{
		displayMode: 'status',
		status: 'canceled',
		label: 'Canceled',
		icon: 'talend-cross',
	},
];

const statusSkeletonHeader = [
	{
		displayMode: 'status',
		status: 'skeleton',
		label: 'Loading',
	},
	{
		displayMode: 'badge',
		label: 'Execution',
		bsStyle: 'info',
		tooltipPlacement: 'top',
		tooltipLabel: 'Updating execution status...',
	},
];

const statusInProgressHeader = [
	{
		displayMode: 'status',
		status: 'inProgress',
		label: 'In Progress',
		actions: [
			{
				label: 'cancel',
				onClick: action('onCancel'),
				link: true,
			},
		],
	},
];

const buttonDownload = {
	displayMode: 'action',
	label: 'Download',
	icon: 'talend-download',
	onClick: action('onDownload'),
	hideLabel: true,
	link: true,
};
const badge = {
	displayMode: 'badge',
	label: 'XML',
	bsStyle: 'info',
	tooltipPlacement: 'top',
	tooltipLabel: 'Extensible Markup Language',
};
const customElement = {
	tooltipPlacement: 'top',
	tooltipLabel: 'Webhook job',
	element: <div className="custom-element">Custom element can be here</div>,
};

const descriptiveTitle = {
	label: 'Panel with descriptive-panel theme',
	bsStyle: 'default',
	tooltipPlacement: 'top',
	className: 'title',
};
const descriptiveTag = {
	label: '(Tag element)',
	bsStyle: 'default',
	tooltipPlacement: 'top',
	className: 'tag',
};
const descriptiveDetail = {
	label: 'Detail element',
	bsStyle: 'default',
	tooltipPlacement: 'top',
	className: 'detail',
};

const element = (
	<div>
		{' '}
		my custom element <ActionButton {...buttonDownload} />
	</div>
);

export default {
	title: 'Components/Layout/CollapsiblePanel',
};

export const Default = () => (
	<div className="col-lg-offset-1 col-lg-10">
		<h1>Collapsible Panel</h1>
		<CollapsiblePanel
			id="panel-default-1"
			header={[{ label: 'Controlled collapsed panel' }]}
			onToggle={action('onToggle')}
		>
			Coucou
		</CollapsiblePanel>
		<CollapsiblePanel
			id="panel-default-2"
			header={[{ label: 'Controlled expanded panel' }]}
			onToggle={action('onToggle')}
			expanded
		>
			Coucou
		</CollapsiblePanel>
		<CollapsiblePanel
			id="panel-default-fail"
			header={[{ label: 'Controlled expanded panel with status fail' }]}
			onToggle={action('onToggle')}
			expanded
			status="failed"
		>
			Coucou
		</CollapsiblePanel>
		<CollapsiblePanel
			id="panel-default-success"
			header={[{ label: 'Controlled expanded panel with success status' }]}
			onToggle={action('onToggle')}
			expanded
			status="successful"
		>
			Coucou
		</CollapsiblePanel>
		<CollapsiblePanel id="panel-default-3" header={[{ label: 'No content panel' }]} />
	</div>
);

export const Header = () => (
	<div className="col-lg-offset-1 col-lg-10">
		<h1>Collapsible Panel Headers</h1>
		<CollapsiblePanel id="panel-header-1" header={[{ label: 'Simple header' }]} />
		<CollapsiblePanel
			id="panel-header-1"
			header={[
				{
					label:
						'Simple header with a very very very very long label that should not completly appear and not push other element outside the headerSimple header with a very very very very long label that should not completly appear and not push other element outside the header',
				},
				buttonDownload,
			]}
		>
			Panel content
		</CollapsiblePanel>
		<CollapsiblePanel
			id="panel-header-2"
			header={[{ label: 'Header with actions' }, { element }]}
		/>
		<CollapsiblePanel
			id="panel-header-element-withbutton"
			header={[{ label: 'Header with element having actions' }, buttonDownload]}
		/>
		<CollapsiblePanel id="panel-header-3" header={[{ label: 'Header with badge' }, badge]} />
		<CollapsiblePanel
			id="panel-header-4"
			header={[{ label: 'Header with custom element' }, customElement]}
		/>
		<CollapsiblePanel
			id="panel-header-5"
			header={[{ label: 'Header with groups' }, [badge, buttonDownload], customElement]}
		/>
		<CollapsiblePanel
			id="panel-header-6"
			header={[{ label: 'Header with caret' }, badge, buttonDownload, customElement]}
		>
			Coucou
		</CollapsiblePanel>
		<CollapsiblePanel id="panel-header-7" header={statusSuccessfulHeader} status="successful" />
		<CollapsiblePanel id="panel-header-8" header={statusFailedHeader} status="failed" />
		<CollapsiblePanel id="panel-header-9" header={statusWarningHeader} status="warning" />
		<CollapsiblePanel id="panel-header-10" header={statusCanceledHeader} status="canceled" />
		<CollapsiblePanel id="panel-header-11" header={statusInProgressHeader} status="inProgress" />
		<CollapsiblePanel id="panel-header-12" header={statusSkeletonHeader} status="skeleton" />
	</div>
);

export const Body = () => (
	<div className="col-lg-offset-1 col-lg-10">
		<h1>Collapsible Panel</h1>
		<CollapsiblePanel
			id="panel-content-1"
			header={[{ label: 'Body with children' }]}
			onToggle={action('onToggle')}
			expanded
		>
			Coucou from children
		</CollapsiblePanel>
		<CollapsiblePanel
			id="panel-default-2"
			header={[{ label: 'Body with key/value' }]}
			onToggle={action('onToggle')}
			expanded
			content={keyValueContent}
		/>
	</div>
);

export const ThemeDescriptivePanel = () => (
	<div className="col-lg-offset-1 col-lg-10">
		<h1>Theme : descriptive-panel</h1>
		<CollapsiblePanel
			id="panel-textual-1"
			header={[[descriptiveTitle, descriptiveTag], descriptiveDetail]}
			content={{
				head: [
					{
						label: 'Content head element',
						bsStyle: 'default',
						tooltipPlacement: 'top',
					},
					{
						label: 'Content head right element',
						bsStyle: 'default',
						tooltipPlacement: 'top',
						className: 'text-right',
					},
				],
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			}}
			theme="descriptive-panel"
			onToggle={action('onToggle')}
			expanded
		/>
		<CollapsiblePanel
			id="panel-textual-2"
			header={[[descriptiveTitle, descriptiveTag], descriptiveDetail]}
			theme="descriptive-panel"
		/>
	</div>
);

export const Selection = () => (
	<div className="col-lg-offset-1 col-lg-10">
		<h1>Selection</h1>
		<CollapsiblePanel
			id="panel-selection-1"
			header={[{ label: 'Controlled collapsed panel' }]}
			onToggle={action('onToggle')}
			onSelect={action('onSelect')}
			status="selected"
		>
			Coucou
		</CollapsiblePanel>
		<CollapsiblePanel
			id="panel-selection-2"
			header={[{ label: 'Controlled expanded panel' }]}
			onToggle={action('onToggle')}
			onSelect={action('onSelect')}
			status="selected"
			expanded
		>
			Coucou
		</CollapsiblePanel>

		<CollapsiblePanel
			id="panel-selection-3"
			header={[[descriptiveTitle, descriptiveTag], descriptiveDetail]}
			content={{
				head: [],
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			}}
			theme="descriptive-panel"
			onToggle={action('onToggle')}
			onSelect={action('onSelect')}
			status="selected"
		/>
		<CollapsiblePanel
			id="panel-selection-4"
			header={[[descriptiveTitle, descriptiveTag], descriptiveDetail]}
			content={{
				head: [],
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			}}
			theme="descriptive-panel"
			onToggle={action('onToggle')}
			onSelect={action('onSelect')}
			status="selected"
			expanded
		/>
	</div>
);

export const Nested = () => (
	<div className="col-lg-offset-1 col-lg-10">
		<h1>Nested</h1>
		<CollapsiblePanel
			id="panel-nested-1"
			header={[{ label: 'First level CollapsiblePanel' }]}
			onToggle={action('onToggle')}
			onSelect={action('onSelect')}
			expanded
		>
			<CollapsiblePanel
				id="panel-nested-2"
				header={[{ label: 'Second level CollapsiblePanel' }]}
				onToggle={action('onToggle')}
				onSelect={action('onSelect')}
				expanded
			>
				<CollapsiblePanel
					id="panel-nested-3"
					header={[{ label: 'Third level CollapsiblePanel' }]}
					onToggle={action('onToggle')}
					onSelect={action('onSelect')}
					expanded
				>
					Lorem ipsum dolor sit amet.
				</CollapsiblePanel>
			</CollapsiblePanel>
		</CollapsiblePanel>
	</div>
);
