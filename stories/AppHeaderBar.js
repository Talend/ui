import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import { AppHeaderBar } from '../src/index';

storiesOf('App Header Bar', module)
	.add('default', () => {
		const logo = {
			src: 'https://www.talend.com/sites/all/themes/talend_responsive/images/talend-logo.png',
			alt: 'Talend logo',
			style: { maxWidth: '100px' },
		};
		return (
			<div>
				<h1>AppHeaderBar</h1>
				<h2>Definition</h2>
				<a href="http://guidelines.talend.com/document/92132#/ui-controls/app-header">Spec</a>
				<h2>Examples</h2>
				<AppHeaderBar
					logo={logo}
					app="Example app name"
				/>
			</div>
		);
	}
);
