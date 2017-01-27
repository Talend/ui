import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import talendIcons from 'talend-icons/dist/react';

import { Action, IconsProvider } from '../src/index';

const icons = {
	'talend-dataprep': talendIcons['talend-dataprep'],
};

const myAction = {
	label: 'Click me',
	icon: 'talend-dataprep',
	onClick: action('You clicked me'),
};

storiesOf('Action', module)
	.addWithInfo('default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />

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
			<p>Reverse display</p>
			<Action
				id="reverseDisplay"
				{...myAction}
				reverseDisplay
			/>
			<p>Transform icon</p>
			<Action
				id="reverseDisplay"
				{...myAction}
				iconTransform={'rotate-180'}
			/>
		</div>
	));
