import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { ActionSplitDropdown } from '../src/index';

const myAction = {
	label: 'Add File',
	icon: 'fa fa-plus',
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
			<h1>ActionSplitDropdown</h1>
			<h2>Definition</h2>
			<p>
				The action component display a primary button with a dropdown
				where each element let the user dispatch an action
			</p>
			<h2>Examples</h2>
			<p>By default :</p>
			<ActionSplitDropdown {...myAction} />
			<p>Without icon</p>
			<ActionSplitDropdown
				{...myAction}
				icon={''}
			/>
			<p>Empty option</p>
			<ActionSplitDropdown
				{...myAction}
				items={[]}
			/>
		</div>
	))
	.addWithInfo('style variatons', () => {
		const btnStyles = {
			margin: '0 5px',
		};
		return (
			<div>
				<h1>ActionSplitDropdown</h1>
				<h2>Definition</h2>
				<p>
					The action component display a split button with a dropdown
					where each element let the user dispatch an action
				</p>
				<h2>Examples</h2>
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
