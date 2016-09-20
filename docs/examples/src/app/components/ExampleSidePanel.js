import React from 'react';
import { SidePanel } from 'react-cmf-bootstrap';

function ExampleSidePanel(props) {
	return (
		<div>
			<h1>SidePanel</h1>
			<h2>Definition</h2>
			<p>It's a panel which can be docked. It can display a list of actions with icons (required)</p>
			<a href="https://app.frontify.com/d/xawdeLsCK7Vn/talend-style-guide#/ui-controls/category-panel" target="_blank">Spec</a>
			<h2>Example</h2>
			<SidePanel actions={['menu:SidePanel']}/>
			<pre><code>{
`import { SidePanel } from 'react-cmf-bootstrap';

<SidePanel actions={['menu:SidePanel']}/>`
			}</code></pre>

		</div>
	);
}

export default ExampleSidePanel;
