import React from 'react';
import { LinkDispatcher } from '../src';

export default function ExampleLinkDispatcher() {
	const action = {
		id: 'example',
		name: 'Example action',
		icon: 'fa-user',
		type: 'MY_SUPER_ACTION',
	};
	return (
		<div>
			<h1>LinkDispatcher</h1>
			<h2>Definition</h2>
			<p>This is a normal ButtonAction plugged into redux.</p>
			<p>It dispatch the provided action to redux.</p>
			<h2>Example</h2>
			<p>Please open the debugger console to see the dispatched action in redux-logger;</p>
			<LinkDispatcher action={action} icon />
		</div>
	);
}
