import React from 'react';
import { action as stAction } from '@kadira/storybook';

import { IconsProvider } from 'react-talend-components';
import { List, Map } from 'immutable';
import { ConfirmDialog } from '../src';

const initialState = new Map({
	size: 'small',
	header: 'DO SOMETHING',
	show: true,
	children: 'Confirm this !',
	validateAction: 'object:confirm:dialog',
	cancelAction: 'object:hide:dialog',
});

export default function ExampleConfirmDialog() {
	return (
		<div>
			<IconsProvider />
			<ConfirmDialog initialState={initialState} />
		</div>
	);
}
