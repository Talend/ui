import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import Immutable, { Map } from 'immutable';

import { List as Component } from 'react-talend-components';
import Container, { DEFAULT_STATE } from './List.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './List.connect';

const settings = {
	list: {
		columns: [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'author', label: 'Author' },
			{ key: 'created', label: 'Created' },
			{ key: 'modified', label: 'Modified' },
		],
		titleProps: {
			key: 'label',
		},
	},
	toolbar: {
		filter: {
			placeholder: 'find an object',
		},
		sort: {
			options: [
				{ id: 'id', name: 'Id' },
				{ id: 'name', name: 'Name' },
			],
			field: 'id',
			isDescending: false,
		},
	},
	actions: {
		//title: 'object:open',
		//left: ['object:add'],
		//items: ['object:delete'],
	},
};

const items = [
	{
		id: 1,
		name: 'Title with actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-excel-o',
		display: 'text',
		className: 'item-0-class',
	},
	{
		id: 2,
		name: 'Title in input mode',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
		display: 'input',
		className: 'item-1-class',
	},
	{
		id: 3,
		name: 'Super long title to trigger overflow on tile rendering',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super long name',
	},
];

describe('Container List', () => {
	xit('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container settings={settings} items={items} />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected List', () => {
	it('should connect List', () => {
		expect(Connected.displayName).toBe(`Connect(${Container.displayName})`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = {
			cmf: {
				components: new Map({
					List: {
						default: DEFAULT_STATE.toJS(),
					},
				}),
				collections: Immutable.fromJS({
					cid: items,
				}),
			},
		};
		let props = mapStateToProps(state, {
			settings: {
				collectionId: 'cid',
			},
		});
		expect(typeof props).toBe('object');
		props = mapStateToProps(state, {
			settings: {},
			items: Immutable.fromJS(items),
		});
		expect(typeof props).toBe('object');
	});
	it('should map state to props', () => {
		const dispatch = () => {};
		const props = mapDispatchToProps(dispatch, {
			settings: {},
		});
		expect(typeof props).toBe('object');
	});
});
