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
			<h1>Action</h1>
			<h2>Definition</h2>
			<p>The action component display a button to let the user dispatch an action</p>
			<h2>Examples</h2>
			<p>By default :</p>
			<Action {...myAction} />
			<p>With hideLabel option</p>
			<Action
				{...myAction}
				hideLabel
			/>
		</div>
	));
