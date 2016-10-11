import React from 'react';
import { AppHeaderBar } from '../src';

export default function AppHeaderBarExample() {
	const logo = {
		src: 'https://www.talend.com/sites/all/themes/talend_responsive/images/talend-logo.png',
		alt: 'Talend logo',
		style: { maxWidth: '100px' },
	};
	return (
		<div>
			<h1>AppHeaderBar</h1>
			<h2>Definition</h2>
			<a href="http://guidelines.talend.com/d/xawdeLsCK7Vn/talend-style-guide#/ui-controls/app-header">Spec</a>
			<h2>Examples</h2>
			<p>It takes the settings from views.appheaderbar</p>
			<AppHeaderBar />
		</div>
	);
}
