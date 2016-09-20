import React from 'react';
import { Button } from 'react-cmf-bootstrap';

function ExampleButton(props) {
	return (
		<div>
			<h1>Example</h1>
			<Button>Button</Button>
			<Button bsStyle="primary">Button primary</Button>
			<Button bsStyle="warning">Button warning</Button>
			<Button bsStyle="danger">Button danger</Button>
			<pre><code>{
`import { Button } from 'react-cmf-bootstrap';

<Button>Button</Button>`
			}</code></pre>
			<a href="https://react-bootstrap.github.io/components.html#buttons" target="_blank">API DOC</a>
		</div>
	);
}

export default ExampleButton;
