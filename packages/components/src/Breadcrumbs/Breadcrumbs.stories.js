import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Breadcrumbs from './Breadcrumbs.component';

storiesOf('Navigation/Breadcrumbs', module)
	.add('default', () => {
		const items = [
			{ text: 'Text A', title: 'Text title A', onClick: action('Text A clicked') },
			{ text: 'Text B', title: 'Text title B', onClick: action('Text B clicked') },
			{ text: 'text c in lower case', title: 'Text title C', onClick: action('Text C clicked') },
		];
		return <Breadcrumbs items={items} />;
	})
	.add('loading', () => <Breadcrumbs loading />)
	.add('with max items reached', () => {
		const items = [
			{
				text: 'item very very very very long that we have to display',
				title: 'item very very very very long that we have to display',
				onClick: action('item very very very very long that we have to display clicked'),
			},
			{ text: 'Text B', title: 'Text title B', onClick: action('Text B clicked') },
			{ text: 'Text C', title: 'Text title C', onClick: action('Text C clicked') },
			{ text: 'Text D', title: 'Text title D', onClick: action('Text D clicked') },
		];
		return <Breadcrumbs items={items} />;
	})
	.add('with more than default max items value', () => {
		const items = [
			{
				text: 'item very very very very long that we have to display',
				title: 'item very very very very long that we have to display',
				onClick: action('item very very very very long that we have to display clicked'),
			},
			{ text: 'Text B', title: 'Text title B', onClick: action('Text B clicked') },
			{ text: 'Text C', title: 'Text title C', onClick: action('Text C clicked') },
			{ text: 'Text D', title: 'Text title D', onClick: action('Text D clicked') },
			{ text: 'Text E', title: 'Text title E', onClick: action('Text E clicked') },
		];
		return <Breadcrumbs items={items} />;
	})
	.add('with more than a specified max items value', () => {
		const items = [
			{
				text: 'item very very very very long that we have to display',
				title: 'item very very very very long that we have to display',
				onClick: action('item very very very very long that we have to display clicked'),
			},
			{ text: 'Text B', title: 'Text title B', onClick: action('Text B clicked') },
			{ text: 'Text C', title: 'Text title C', onClick: action('Text C clicked') },
			{ text: 'Text D', title: 'Text title D', onClick: action('Text D clicked') },
			{ text: 'Text E', title: 'Text title E', onClick: action('Text E clicked') },
			{ text: 'Text F', title: 'Text title F', onClick: action('Text F clicked') },
		];
		return <Breadcrumbs items={items} maxItems={5} />;
	});
