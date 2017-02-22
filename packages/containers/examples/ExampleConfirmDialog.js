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
	validateAction: {
		label: 'Ok',
		bsStyle: 'primary',
		onClick: stAction('You clicked ok'),
	},
	cancelAction: {
		label: 'No !',
		onClick: stAction('You clicked no'),
	},
});

export default function ExampleConfirmDialog() {
	return (
		<div>
			<IconsProvider />
			<ConfirmDialog initialState={initialState} />
		</div>
	);
}
