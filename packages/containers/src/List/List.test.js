import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-cmf/lib/mock';
import Immutable, { Map } from 'immutable';

import { List as Component } from 'react-talend-components';
import Container, { DEFAULT_STATE } from './List.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './List.connect';

const list = {
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
};

const toolbar = {
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
};

const actions = {
	// title: 'object:open',
	// left: ['object:add'],
	// items: ['object:delete'],
};

const settings = {
	list,
	toolbar,
	actions,
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
	it('should put default props', () => {
		const wrapper = shallow(
			<Container {...settings} items={items} />
		, { lifecycleExperimental: true });
		const props = wrapper.props();
		expect(props.displayMode).toBe('table');
		expect(props.list.items.length).toBe(3);
		expect(props.list.items[0].id).toBe(1);
		expect(props.list.items[1].id).toBe(2);
		expect(props.list.items[2].id).toBe(3);
		expect(props.list.columns).toBe(list.columns);
		expect(props.list.titleProps.key).toBe('label');
		expect(typeof props.list.titleProps.onClick).toBe('function');
		expect(props.toolbar.filter.placeholder).toBe('find an object');
		expect(typeof props.toolbar.filter.onFilter).toBe('function');
		expect(typeof props.toolbar.display.onChange).toBe('function');
		expect(typeof props.toolbar.sort.onChange).toBe('function');
		expect(props.toolbar.sort.options.length).toBe(2);
	});
	it('should render without toolbar', () => {
		const wrapper = shallow(
			<Container items={items} />
		, { lifecycleExperimental: true });
		const props = wrapper.props();
		expect(props.toolbar).toBe(undefined);
	});
	it('should support displayMode as props', () => {
		const wrapper = shallow(
			<Container displayMode="large" items={items} />
		, { lifecycleExperimental: true });
		const props = wrapper.props();
		expect(props.displayMode).toBe('large');
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
