import React from 'react';
import { Button } from '../src';

export default function ExampleButton() {
	return (
		<div>
			<h1>Button</h1>
			<h2>Definition</h2>
			<p>A bare button. The implementation is in react-bootstrap</p>
			<a href="https://react-bootstrap.github.io/components.html#buttons" target="_blank">API DOC</a>
			<h2>Example</h2>
			<Button>Button</Button>
			<Button bsStyle="primary">Button primary</Button>
			<Button bsStyle="warning">Button warning</Button>
			<Button bsStyle="danger">Button danger</Button>
		</div>
	);
}
