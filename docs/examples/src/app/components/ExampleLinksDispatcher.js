import React from 'react';
import { LinksDispatcher } from 'react-cmf-bootstrap';

function ExampleLinksDispatcher(props) {
	return (
		<div>
			<h1>LinksDispatcher</h1>
			<h2>Definition</h2>
			<p>This component take a content type and a category props to display the set of actions that are possible on it.</p>
			<h2>Example</h2>
			<p>Please open the debugger console to see the dispatched action in redux-logger;</p>
			<p>If you want to check the configuration provided for this app:&nbsp;
			<a href="/settings.json" target="_blank">open settings.json</a>
			</p>
			<LinksDispatcher contentType="article" category="primary" icon />
			<pre><code>{
`import { LinksDispatcher } from 'react-cmf-bootstrap';

<LinksDispatcher contentType="article" category="primary" icon />`
			}</code></pre>
		</div>
	);
}

export default ExampleLinksDispatcher;
