import React from 'react';
import { action as stAction } from '@kadira/storybook';

import { IconsProvider } from 'react-talend-components';
import { List, Map } from 'immutable';
import { ConfirmDialog } from '../src';

const actionsProps = {
	actions : {
		cancelRemoveSmType: 'object:cancel:remove:semantic',
		removeSmType: 'object:remove:semantic',
	},
};

const initialState = new Map({
	size: 'small',
	header: 'DO SOMETHING',
	show: true,
	children: 'Confirm this !',
	validateAction: {
		label: 'Ok',
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'No !',
	},
});

export default function ExampleConfirmDialog() {
	return (
		<div>
			<IconsProvider />
			<ConfirmDialog initialState={initialState} { ...actionsProps }/>
		</div>
	);
}
