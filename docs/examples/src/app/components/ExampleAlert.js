import React from 'react';
import { Alert } from 'react-cmf-bootstrap';

function ExampleAlert(props) {
	return (
		<div>
			<h1>Alert</h1>
			<h2>Definition</h2>
			<p>The alert are used to display a message to the end user. It can be of different natures / severity.</p>
			<h2>Examples</h2>
			<Alert bsStyle="success">
				success !
			</Alert>
			<Alert bsStyle="warning">
				warning !
			</Alert>
			<Alert bsStyle="info">
				info !
			</Alert>
			<Alert bsStyle="danger">
				danger !
			</Alert>
			<pre><code>{
`import { Alert } from 'react-cmf-bootstrap';

<Alert bsStyle="success">
	success !
</Alert>
<Alert bsStyle="warning">
	warning !
</Alert>
<Alert bsStyle="info">
	info !
</Alert>
<Alert bsStyle="danger">
	danger !
</Alert>`
			}</code></pre>
			<a href="https://react-bootstrap.github.io/components.html#alerts"target="_blank">API DOC</a>

		</div>
	);
}

export default ExampleAlert;
