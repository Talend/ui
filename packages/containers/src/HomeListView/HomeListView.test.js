import React from 'react';
import renderer from 'react-test-renderer';
import mock, { Provider } from 'react-cmf/lib/mock';
import { fromJS, Map } from 'immutable';

import Component from './HomeListView.component';
import Connected from './HomeListView.connect';

const sidepanel = {
	actionIds: ['menu:demo', 'menu:article'],
};

const list = {
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'label', label: 'Name' },
		{ key: 'author', label: 'Author' },
		{ key: 'created', label: 'Created' },
		{ key: 'modified', label: 'Modified' },
	],
	titleProps: {
		key: 'label',
	},
};

const actions = {};

const toolbar =	{
	sort: {
		field: 'id',
		options: [
			{ id: 'id', name: 'Id' },
			{ id: 'label', name: 'Name' },
		],
	},
	filter: {
		placeholder: 'find an object',
	},
};

const items = fromJS([
	{
		id: 1,
		label: 'Title with actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-excel-o',
		display: 'text',
		className: 'item-0-class',
	},
	{
		id: 2,
		label: 'Title in input mode',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
		display: 'input',
		className: 'item-1-class',
	},
	{
		id: 3,
		label: 'Super long title to trigger overflow on tile rendering',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super long name',
	},
]);

const listProps = {
	list,
	actions,
	toolbar,
	items,
};
const reduxState = mock.state();
reduxState.cmf.components = new Map({});
reduxState.cmf.collections = new Map({});

describe('Component HomeListView', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider state={reduxState}>
				<Component header={(<div className="header" />)} sidepanel={sidepanel} list={listProps}>
					<h1>Hello children</h1>
				</Component>
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected HomeListView', () => {
	it('should connect HomeListView', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Component.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Component);
	});
});
