import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { Progress } from '../src/index';

storiesOf('Progress', module)
	.addWithInfo('Without tooltip', () => (
		<div>
			<h1>Action</h1>
			<h2>Definition</h2>
			<p>
				The component displays a progress bar at the top of the window.<br/>
				<a href="http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle">Spec</a>
			</p>
			<h2>Examples</h2>
			Look above
			<Progress id="my-progress" percent={60} />
		</div>
	))
	.addWithInfo('With tooltip', () => (
		<div>
			<h1>Action</h1>
			<h2>Definition</h2>
			<p>
				The component displays a progress bar at the top of the window.<br/>
				<a href="http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle">Spec</a>
			</p>
			<h2>Examples</h2>
			Look above and put the mouse on it
			<Progress id="my-progress" percent={75} tooltip="Hey ! Already 75% !" />
		</div>
	));
