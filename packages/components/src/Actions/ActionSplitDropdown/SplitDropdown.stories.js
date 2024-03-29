import { action } from '@storybook/addon-actions';

import ActionSplitDropdown from './ActionSplitDropdown.component';

const items = [
	{
		label: 'From Local',
		'data-feature': 'actionsplitdropdown.items',
		onClick: action('From Local click'),
	},
	{
		label: 'From Remote',
		'data-feature': 'actionsplitdropdown.items',
		onClick: action('From Remote click'),
	},
];

const itemsWithIcons = [
	{
		...items[0],
		icon: 'talend-logo-ic',
	},
	{
		...items[1],
		icon: 'talend-logo-dp',
	},
];

const myAction = {
	label: 'Add File',
	icon: 'talend-environment',
	'data-feature': 'actionsplitdropdown',
	onClick: action('onAdd'),
	items,
	emptyDropdownLabel: 'No option',
};

export default {
	title: 'Components/Deprecated/SplitDropdown',

	decorators: [
		story => (
			<div>
				{story()}
				<div className="container" style={{ paddingTop: 40 }} />
			</div>
		),
	],
};

export const Default = () => (
	<div>
		<p>By default :</p>
		<div id="default">
			<ActionSplitDropdown {...myAction} />
		</div>
		<p>Options with icons</p>
		<div id="icon">
			<ActionSplitDropdown {...myAction} items={itemsWithIcons} />
		</div>
		<p>Without icon</p>
		<div id="noicon">
			<ActionSplitDropdown {...myAction} icon="" />
		</div>
		<p>dropup</p>
		<div id="noicon">
			<ActionSplitDropdown {...myAction} dropup />
		</div>
		<p>Empty option</p>
		<div id="empty">
			<ActionSplitDropdown {...myAction} items={[]} />
		</div>
	</div>
);

export const StyleVariations = () => {
	const btnStyles = {
		margin: '0 5px',
	};
	return (
		<div id="styles">
			<span style={btnStyles}>
				<ActionSplitDropdown bsStyle="default" {...myAction} />
			</span>
			<span style={btnStyles}>
				<ActionSplitDropdown bsStyle="primary" {...myAction} />
			</span>
			<span style={btnStyles}>
				<ActionSplitDropdown bsStyle="success" {...myAction} />
			</span>
			<span style={btnStyles}>
				<ActionSplitDropdown bsStyle="info" {...myAction} />
			</span>
			<span style={btnStyles}>
				<ActionSplitDropdown bsStyle="warning" {...myAction} />
			</span>
			<span style={btnStyles}>
				<ActionSplitDropdown bsStyle="danger" {...myAction} />
			</span>
		</div>
	);
};
