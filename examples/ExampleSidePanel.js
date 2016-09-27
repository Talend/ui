import React from 'react';
import { SidePanel } from '../src';

export default function ExampleSidePanel() {
	return (
		<div>
			<h1>SidePanel</h1>
			<h2>Definition</h2>
			<p>It's a panel which can be docked. It can display a list of actions with icons (required)</p>
			<a href="https://app.frontify.com/d/xawdeLsCK7Vn/talend-style-guide#/ui-controls/category-panel" target="_blank">Spec</a>
			<h2>Example</h2>
			<SidePanel actions={['menu:demo']}/>
		</div>
	);
}
