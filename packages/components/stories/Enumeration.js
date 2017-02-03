import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Enumeration, IconsProvider } from '../src/index';

const props = {
	displayMode: 'DISPLAY_MODE_DEFAULT',

	headerDefault: [{
		label: 'Add item',
		icon: 'talend-plus',
		id: 'add',
		onClick: action('header.onAdd'),
	}],
	headerInput: [{
		disabled: false,
		label: 'Validate',
		icon: 'talend-check',
		id: 'validate',
		onClick: action('headerInput.onValidate'),
	}, {
		label: 'Abort',
		icon: 'talend-cross',
		id: 'abort',
		onClick: action('headerInput.onAbort'),
	}],
	items: Array(50).fill('').map((item, index) => {
		return {
			id: index,
			values: [`Lorem ipsum dolor sit amet ${index}`],
		};
	}),
	onAddChange: action('onAddChange'),
	onAddKeyDown: action('onAddKeyDown'),
};

const addProps = { ...props, displayMode: 'DISPLAY_MODE_ADD' };

storiesOf('Enumeration', module)
	.addWithInfo('default', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...props}
			/>
		</div>
	))
	.addWithInfo('add', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...addProps}
			/>
		</div>
	));
