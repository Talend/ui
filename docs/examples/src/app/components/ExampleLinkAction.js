import React from 'react';
import { LinkAction } from 'react-cmf-bootstrap';

function ExampleLinkAction(props) {
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
			<h1>LinkAction</h1>
			<h2>Definition</h2>
			<p>This is a normal button which support the same API as Button.</p>
			<p>It takes an action to display name and icon. It takes a onClick property to know what to do on the click event.</p>
			<LinkAction action={action} onClick={onClick} icon />
			<pre><code>{
`import { LinkAction } from 'react-cmf-bootstrap';

const action = {
	id: 'example',
	name: 'Example action',
	icon: 'fa-user',
};
function onClick() {
	alert('hello');
}

<LinkAction action={action} onClick={onClick}} icon/>`
			}</code></pre>
		</div>
	);
}

export default ExampleLinkAction;
