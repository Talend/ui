import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { ActionSplitDropdown } from '../src/index';

const myAction = {
	label: 'Add File',
	icon: 'talend-plus-circle',
	onClick: action('onAdd'),
	items: [
		{
			label: 'From Local',
			onClick: action('From Local click'),
		},
		{
			label: 'From Remote',
			onClick: action('From Remote click'),
		},
	],
	emptyDropdownLabel: 'No option',
};

storiesOf('ActionSplitDropdown', module)
	.addWithInfo('default', () => (
		<div>
			<p>By default :</p>
			<div id="default">
				<ActionSplitDropdown {...myAction} />
			</div>
			<p>Without icon</p>
			<div id="noicon">
				<ActionSplitDropdown
					{...myAction}
					icon={''}
				/>
			</div>
			<p>Empty option</p>
			<div id="empty">
				<ActionSplitDropdown
					{...myAction}
					items={[]}
				/>
			</div>
		</div>
	))
	.addWithInfo('style variatons', () => {
		const btnStyles = {
			margin: '0 5px',
		};
		return (
			<div id="styles">
				<span style={btnStyles}>
					<ActionSplitDropdown bsStyle="default" {...myAction} /></span>
				<span style={btnStyles}>
					<ActionSplitDropdown bsStyle="primary" {...myAction} /></span>
				<span style={btnStyles}>
					<ActionSplitDropdown bsStyle="success" {...myAction} /></span>
				<span style={btnStyles}>
					<ActionSplitDropdown bsStyle="info" {...myAction} /></span>
				<span style={btnStyles}>
					<ActionSplitDropdown bsStyle="warning" {...myAction} /></span>
				<span style={btnStyles}>
					<ActionSplitDropdown bsStyle="danger" {...myAction} /></span>
			</div>
		);
	});
