import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Action } from '../src/index';

const myAction = {
	label: 'Click me',
	icon: 'fa fa-asterisk',
	onClick: action('You clicked me'),
};

storiesOf('Action', module)
	.addWithInfo('default', () => (
		<div>
			<p>By default :</p>
			<Action id="default" {...myAction} />
			<p>With hideLabel option</p>
			<Action
				id="hidelabel"
				{...myAction}
				hideLabel
			/>
			<p>In progress</p>
			<Action
				id="inprogress"
				{...myAction}
				inProgress
			/>
		</div>
	));
