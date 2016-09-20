import React from 'react';
import { SideMenu } from 'react-cmf-bootstrap';

function ExampleSideMenu(props) {
	return (
		<div>
			<h1>SideMenu</h1>
			<h2>Definition</h2>
			<p>It's a panel which can be docked. It can display a list of actions with icons (required)</p>
			<a href="https://app.frontify.com/d/xawdeLsCK7Vn/talend-style-guide#/ui-controls/category-panel" target="_blank">Spec</a>
			<h2>Example</h2>
			<SideMenu actions={['menu:SideMenu']}/>
			<pre><code>{
`import { SideMenu } from 'react-cmf-bootstrap';

<SideMenu actions={['menu:SideMenu']}/>`
			}</code></pre>

		</div>
	);
}

export default ExampleSideMenu;
