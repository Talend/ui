import React from 'react';
import { Action } from '../src';

export default function ExampleAction() {

	const action = {
		id: 'example',
		name: 'Example action',
		icon: 'fa-user',
		type: 'MY_SUPER_ACTION',
	};
	function onClick() {
		alert('hello');
	}
	return (
		<div>
			<h1>Action</h1>
			<h2>Definition</h2>
			<p>This is a normal button which support the same API as Button.</p>
			<p>It takes an action to display name and icon. It takes a onClick property to know what to do on the click event.</p>
			<Action action={action} onClick={onClick} icon />
		</div>
	);
}
