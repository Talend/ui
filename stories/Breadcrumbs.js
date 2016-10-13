import React from 'react';
import { storiesOf, setAddon, action } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { Breadcrumbs } from '../src/index';

setAddon(infoAddon);

storiesOf('Breadcrumbs', module)
	.addWithInfo('default', () => {
		const items = [
			{ text: 'Text A', title: 'Text title A', onClick: action('Text A clicked') },
			{ text: 'Text B', title: 'Text title B', onClick: action('Text B clicked') },
			{ text: 'Text C', title: 'Text title C', onClick: action('Text C clicked') },
		];
		return (
			<div>
				<h1>Breadcrumb</h1>
				<h2>Definition</h2>
				<a href="http://guidelines.talend.com/document/92132#/ui-controls/breadcrumb-home-page">Spec</a>
				<h2>Example</h2>
				<Breadcrumbs items={items} />
			</div>
		);
	})
	.addWithInfo('with max items reached', () => {
		const items = [
			{ text: 'Text A', title: 'Text title A', onClick: action('Text A clicked') },
			{ text: 'Text B', title: 'Text title B', onClick: action('Text B clicked') },
			{ text: 'Text C', title: 'Text title C', onClick: action('Text C clicked') },
			{ text: 'Text D', title: 'Text title D', onClick: action('Text D clicked') },
			{ text: 'Text E', title: 'Text title E', onClick: action('Text E clicked') },
		];
		return (
			<div>
				<h1>Breadcrumb with max items reached</h1>
				<h2>Definition</h2>
				<a href="http://guidelines.talend.com/document/92132#/ui-controls/breadcrumb-home-page">Spec</a>
				<h2>Example with 2 visible items max</h2>
				<Breadcrumbs items={items} maxItems={2} />
			</div>
		);
	});
