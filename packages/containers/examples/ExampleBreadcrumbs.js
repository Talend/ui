import React from 'react';
import api from '@talend/react-cmf';
import { Map } from 'immutable';
import { Breadcrumbs } from '../src';
import { action } from '@storybook/addon-actions';

const initialState = new Map({
	items: [
		{ text: 'Text A', title: 'Text title A', actionCreator: 'folder:openA', },
		{ text: 'Text B', title: 'Text title B', actionCreator: 'folder:openB', },
		{ text: 'text c in lower case', title: 'Text title C', actionCreator: 'folder:openC', },
	],
	maxItems: 3,
});

api.actionCreator.register('folder:openA',  action('click on A'));
api.actionCreator.register('folder:openB',  action('click on B'));
api.actionCreator.register('folder:openC',  action('click on C'));

export default function ExampleBreadcrumbs() {
	return (
		<div>
			<Breadcrumbs initialState={initialState} />
		</div>
	);
}
