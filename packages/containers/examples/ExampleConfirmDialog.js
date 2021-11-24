import React from 'react';

import { Map } from 'immutable';
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
			<ConfirmDialog initialState={initialState} />
		</div>
	);
}
