import { shallow } from 'enzyme';
import React from 'react';
import { Map, fromJS, List as ImmutableList } from 'immutable';
import cloneDeep from 'lodash/cloneDeep';

import Container, { DEFAULT_STATE } from './List.container';
import Connected, { mapStateToProps } from './List.connect';

const list = {
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'name', label: 'Name' },
		{ key: 'author', label: 'Author' },
		{ key: 'created', label: 'Created' },
		{ key: 'modified', label: 'Modified' },
	],
	titleKey: 'label',
};

const toolbar = {
	toolbar: true,
	filterPlaceholder: 'find an object',
	sortOptions: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
	sortOn: 'id',
	sortIsDescending: false,
	displayModes: ['large', 'table'],
	startIndex: 1,
	itemsPerPage: 25,
	totalResults: 36,
	onPaginationChange: 'pagination:change',
};

// this is deprecated
const actions = {
	title: 'object:open', // onTitleClick
	editSubmit: 'object:edit:submit', // onTitleEditSubmit
	editCancel: 'object:edit:cancel', // onTitleEditCancel
};

const settings = {
	actions,
	...list,
	...toolbar,
};

const items = fromJS([
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
		name: 'Super long title to trigger overflow on some rendering',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super long name',
	},
]);

describe('Container List', () => {
	it('should put default props', () => {
		const wrapper = shallow(<Container {...cloneDeep(settings)} items={items} />);
		const props = wrapper.props();
		expect(props.displayMode).toBe('table');
		expect(props.items.length).toBe(3);
		expect(props.items[0].id).toBe(1);
		expect(props.items[1].id).toBe(2);
		expect(props.items[2].id).toBe(3);
		expect(props.columns).toEqual(list.columns);
		expect(props.titleKey).toBe('label');
		expect(typeof props.onTitleClick).toBe('function');
		expect(typeof props.onTitleEditSubmit).toBe('function');
		expect(typeof props.onTitleEditCancel).toBe('function');
		expect(props.filterPlaceholder).toBe('find an object');
		expect(typeof props.onFilterChange).toBe('function');
		expect(typeof props.onDisplayChange).toBe('function');
		expect(typeof props.onSortChange).toBe('function');
		expect(props.sortOptions.length).toBe(2);
		expect(props).toMatchSnapshot();
	});

	it('should define the cellDictionary props', () => {
		const getComponent = jest.fn(() => 'my custom component');
		const wrapper = shallow(
			<Container
				cellDictionary={{ custom: { component: 'componentId' } }}
				getComponent={getComponent}
				items={fromJS([])}
			/>,
		);
		const props = wrapper.props();

		expect(props.list.cellDictionary).toEqual({
			custom: { cellRenderer: 'my custom component' },
			title: {
				cellRenderer: jasmine.any(Function),
				cellType: 'title',
				className: 'tc-list-title-cell',
			},
		});
		expect(getComponent).toHaveBeenCalledWith('componentId');
	});

	it('should define the headerDictionary props', () => {
		const getComponent = jest.fn(() => 'my custom component');
		const wrapper = shallow(
			<Container
				getComponent={getComponent}
				items={fromJS([])}
				headerDictionary={{ custom: { component: 'componentId' } }}
			/>,
		);
		const props = wrapper.props();

		expect(props.list.headerDictionary).toEqual({
			custom: { headerRenderer: 'my custom component' },
		});
		expect(getComponent).toHaveBeenCalledWith('componentId');
	});

	it('should add multiSelection props', () => {
		const multiSelectionSetting = cloneDeep(settings);
		multiSelectionSetting.idKey = 'id';
		multiSelectionSetting.multiSelectActions = {
			left: ['object:remove'],
		};
		const wrapper = shallow(<Container {...multiSelectionSetting} items={items} />);
		const props = wrapper.props();
		expect(typeof props.list.itemProps.onToggle).toBe('function');
		expect(typeof props.list.itemProps.onToggleAll).toBe('function');
		expect(typeof props.list.itemProps.isSelected).toBe('function');
	});

	it('should render without toolbar', () => {
		const wrapper = shallow(<Container items={items} />, { lifecycleExperimental: true });
		const props = wrapper.props();
		expect(props.toolbar).toBe(undefined);
	});

	it('should support displayMode as props', () => {
		const wrapper = shallow(<Container displayMode="large" items={items} />);
		const props = wrapper.props();
		expect(props.displayMode).toBe('large');
	});

	it('should ontitle click call action creator', () => {
		const dispatchActionCreator = jest.fn();
		const actionCreator = jest.fn();
		const context = {
			registry: {
				'actionCreator:object:open': actionCreator,
			},
		};
		const wrapper = shallow(
			<Container
				{...cloneDeep(settings)}
				items={items}
				dispatchActionCreator={dispatchActionCreator}
			/>,
			{
				lifecycleExperimental: true,
				context,
			},
		);
		const props = wrapper.props();
		const onClick = props.onTitleClick;
		const e = {};
		const data = { foo: 'bar' };

		onClick(e, data);
		const calls = dispatchActionCreator.mock.calls;
		expect(calls.length).toBe(1);
		expect(calls[0][0]).toBe('object:open');
		expect(calls[0][1]).toBe(e);
		expect(calls[0][2]).toBe(data);
		expect(calls[0][3].registry).toBe(context.registry);
	});

	it('should ontitle edit submit call action creator', () => {
		const dispatchActionCreator = jest.fn();
		const actionCreator = jest.fn();
		const context = {
			registry: {
				'actionCreator:object:edit:submit': actionCreator,
			},
		};
		const wrapper = shallow(
			<Container
				{...cloneDeep(settings)}
				items={items}
				dispatchActionCreator={dispatchActionCreator}
			/>,
			{
				lifecycleExperimental: true,
				context,
			},
		);
		const props = wrapper.props();
		const onEditSubmit = props.onTitleEditSubmit;
		const e = {};
		const data = { foo: 'bar' };

		onEditSubmit(e, data);
		const calls = dispatchActionCreator.mock.calls;
		expect(calls.length).toBe(1);
		expect(calls[0][0]).toBe('object:edit:submit');
		expect(calls[0][1]).toBe(e);
		expect(calls[0][2]).toBe(data);
		expect(calls[0][3].registry).toBe(context.registry);
	});

	it('should ontitle edit cancel call action creator', () => {
		const dispatchActionCreator = jest.fn();
		const actionCreator = jest.fn();
		const context = {
			registry: {
				'actionCreator:object:edit:cancel': actionCreator,
			},
		};
		const wrapper = shallow(
			<Container
				{...cloneDeep(settings)}
				items={items}
				dispatchActionCreator={dispatchActionCreator}
			/>,
			{
				lifecycleExperimental: true,
				context,
			},
		);
		const props = wrapper.props();
		const onEditCancel = props.onTitleEditCancel;
		const e = {};
		const data = { foo: 'bar' };

		onEditCancel(e, data);
		const calls = dispatchActionCreator.mock.calls;
		expect(calls.length).toBe(1);
		expect(calls[0][0]).toBe('object:edit:cancel');
		expect(calls[0][1]).toBe(e);
		expect(calls[0][2]).toBe(data);
		expect(calls[0][3].registry).toBe(context.registry);
	});

	it('should not set onclick if no action on title', () => {
		const dispatchActionCreator = jest.fn();
		const actionCreator = jest.fn();
		const context = {
			registry: {
				'actionCreator:object:open': actionCreator,
			},
		};
		const settingsWithoutActions = {
			...cloneDeep(settings),
			actions: {},
		};
		const wrapper = shallow(
			<Container
				{...settingsWithoutActions}
				items={items}
				dispatchActionCreator={dispatchActionCreator}
			/>,
			{
				lifecycleExperimental: true,
				context,
			},
		);
		const props = wrapper.props();
		expect(props.onTitleClick).toBeUndefined();
	});

	it('should call action creator on pagination change', () => {
		// given
		const dispatchActionCreator = jest.fn();
		const actionCreator = jest.fn();
		const setState = jest.fn();
		const context = {
			registry: {
				'actionCreator:pagination:change': actionCreator,
			},
		};
		const wrapper = shallow(
			<Container
				{...cloneDeep(settings)}
				items={items}
				dispatchActionCreator={dispatchActionCreator}
				setState={setState}
				pagination
			/>,
			{
				lifecycleExperimental: true,
				context,
			},
		);
		const props = wrapper.props();
		const event = null;
		const data = { startIndex: 1, itemsPerPage: 5 };

		expect(dispatchActionCreator).not.toBeCalled();

		// when
		props.onPaginationChange(data.startIndex, data.itemsPerPage);

		// then
		expect(dispatchActionCreator).toBeCalledWith('pagination:change', event, data, context);
	});

	it('should set the proper rowHeight', () => {
		const rowHeight = {
			table: 3,
			large: 2,
		};
		const wrapper = shallow(
			<Container {...cloneDeep(settings)} items={items} rowHeight={rowHeight} />,
			{ lifecycleExperimental: true },
		);
		const props = wrapper.props();
		expect(props.displayMode).toBe('table');
		expect(props.rowHeight).toBe(3);
	});

	describe('Toggle selection', () => {
		it('should select one item', () => {
			// given
			const multiSelectionSetting = cloneDeep(settings);
			multiSelectionSetting.idKey = 'id';
			multiSelectionSetting.multiSelectActions = {
				left: ['object:remove'],
			};
			multiSelectionSetting.setState = jest.fn();
			const state = fromJS({ selectedItems: [] });
			multiSelectionSetting.state = state;
			const wrapper = shallow(<Container {...multiSelectionSetting} items={items} />, {
				lifecycleExperimental: true,
			});
			// when
			wrapper.instance().onToggleMultiSelection({}, { id: 1 });
			// then
			expect(multiSelectionSetting.setState.mock.calls[0][0]).toEqual({
				selectedItems: new ImmutableList([1]),
			});
		});

		it('should deselect one item', () => {
			// given
			const multiSelectionSetting = cloneDeep(settings);
			multiSelectionSetting.idKey = 'id';
			multiSelectionSetting.multiSelectActions = {
				left: ['object:remove'],
			};
			multiSelectionSetting.setState = jest.fn();
			const state = fromJS({ selectedItems: [1] });
			multiSelectionSetting.state = state;
			const wrapper = shallow(<Container {...multiSelectionSetting} items={items} />, {
				lifecycleExperimental: true,
			});
			// when
			wrapper.instance().onToggleMultiSelection({}, { id: 1 });
			// then
			expect(multiSelectionSetting.setState.mock.calls[0][0]).toEqual({
				selectedItems: new ImmutableList([]),
			});
		});
		it('should select all items', () => {
			// given
			const multiSelectionSetting = cloneDeep(settings);
			multiSelectionSetting.idKey = 'id';
			multiSelectionSetting.multiSelectActions = {
				left: ['object:remove'],
			};
			multiSelectionSetting.setState = jest.fn();
			const state = fromJS({ selectedItems: [] });
			multiSelectionSetting.state = state;
			const wrapper = shallow(<Container {...multiSelectionSetting} items={items} />, {
				lifecycleExperimental: true,
			});
			// when
			wrapper.instance().onToggleAllMultiSelection();
			// then

			expect(multiSelectionSetting.setState.mock.calls[0][0]).toEqual({
				selectedItems: new ImmutableList([1, 2, 3]),
			});
		});

		it('should deselect all items', () => {
			// given
			const multiSelectionSetting = cloneDeep(settings);
			multiSelectionSetting.idKey = 'id';
			multiSelectionSetting.multiSelectActions = {
				left: ['object:remove'],
			};
			multiSelectionSetting.setState = jest.fn();
			const state = fromJS({ selectedItems: [1, 2, 3] });
			multiSelectionSetting.state = state;
			const wrapper = shallow(<Container {...multiSelectionSetting} items={items} />, {
				lifecycleExperimental: true,
			});
			// when
			wrapper.instance().onToggleAllMultiSelection();
			// then
			expect(multiSelectionSetting.setState.mock.calls[0][0]).toEqual({
				selectedItems: new ImmutableList([]),
			});
		});

		it('should compute the number of selected items', () => {
			// given
			const multiSelectionSetting = cloneDeep(settings);
			multiSelectionSetting.idKey = 'id';
			multiSelectionSetting.multiSelectActions = {
				left: ['object:remove'],
			};
			multiSelectionSetting.setState = jest.fn();
			const state = fromJS({ selectedItems: [1, 2, 3] });
			multiSelectionSetting.state = state;

			// when
			const wrapper = shallow(<Container {...multiSelectionSetting} items={items} />, {
				lifecycleExperimental: true,
			});
			// then
			expect(wrapper.props().toolbar.actionBar.selected).toBe(3);
		});
	});
});

describe('Connected List', () => {
	it('should connect List', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});

	it('should map items to props from collection List', () => {
		// given
		const state = {
			cmf: {
				components: fromJS({
					'Container(List)': {
						cid: DEFAULT_STATE.toJS(),
					},
				}),
				collections: fromJS({
					cid: items,
				}),
			},
		};

		// when
		const props = mapStateToProps(state, { collectionId: 'cid' });

		// then
		expect(props).toMatchSnapshot();
	});

	it('should map items to props from default collection List', () => {
		// given
		const state = {
			cmf: {
				components: fromJS({
					'Container(List)': {
						default: DEFAULT_STATE.toJS(),
					},
				}),
				collections: new Map(),
			},
		};

		// when : no collectionId defined
		const props = mapStateToProps(state, {
			items: fromJS(items),
		});

		// then
		expect(props).toMatchSnapshot();
	});

	it('should map items to props from collection Map', () => {
		// given
		const state = {
			cmf: {
				components: fromJS({
					'Container(List)': {
						cid: {
							...DEFAULT_STATE.toJS(),
							toolbar: {
								pagination: {
									onChange: 'pagination:change',
								},
							},
						},
					},
				}),
				collections: fromJS({
					cid: {
						pagination: {
							totalResults: 36,
							itemsPerPage: 25,
							startIndex: 1,
						},
						items,
					},
				}),
			},
		};

		// when
		const props = mapStateToProps(state, { collectionId: 'cid', toolbar: {} });

		// then
		expect(props).toMatchSnapshot();
	});
});
