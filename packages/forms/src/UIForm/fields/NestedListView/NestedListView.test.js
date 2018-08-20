import React from 'react';
import { shallow } from 'enzyme';

import { NestedListViewWidget } from './NestedListView.component';
import { getItemsProps, initItems } from './NestedListView.utils';

jest.useFakeTimers();

describe('NestedListView component', () => {
	let props;

	beforeEach(() => {
		props = {
			id: 'NestedListView',
			onChange: jest.fn(),
			onFinish: jest.fn(),
			schema: {
				title: 'Nested ListView',
				schema: {
					properties: {
						bar: {
							items: {
								enum: ['bar_1', 'bar_2'],
								enumNames: ['Bar 1', 'Bar 2'],
							},
						},
						foo: {
							items: {
								enum: ['foo_1', 'foo_2'],
								enumNames: ['Foo 1', 'Foo 2'],
							},
						},
					},
				},
				items: [
					{
						title: 'Bar',
						key: ['baz', 'bar'],
						titleMap: [{ name: 'Bar 1', value: 'bar_1' }, { name: 'Bar 2', value: 'bar_2' }],
					},
					{
						title: 'Foo',
						key: ['baz', 'foo'],
						titleMap: [{ name: 'Foo 1', value: 'foo_1' }, { name: 'Foo 2', value: 'foo_2' }],
					},
				],
				required: true,
				emptyLabel: 'emptyLabel',
				noResultLabel: 'noResultLabel',
				placeholder: 'placeholder',
				value: {},
				t: jest.fn(),
			},
			value: {},
		};
	});

	it('should render component', () => {
		// when
		const wrapper = shallow(<NestedListViewWidget {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('onExpandToggle', () => {
		it('should expand the right children', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			const event = {};
			const item = { toggleId: 'baz.foo' };

			wrapper.instance().onExpandToggle(event, item);

			// then
			const { toggledChildren, displayedItems } = wrapper.state();
			expect(toggledChildren).toEqual(['baz.foo']);
			expect(displayedItems[0].expanded).toBe(false);
			expect(displayedItems[1].expanded).toBe(true);
		});

		it('should collapse an already expanded section', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			wrapper.setState({ toggledChildren: ['baz.foo'] });
			const event = {};
			const item = { toggleId: 'baz.foo' };

			wrapper.instance().onExpandToggle(event, item);

			// then
			const { toggledChildren, displayedItems } = wrapper.state();
			expect(toggledChildren).toEqual([]);
			expect(displayedItems[0].expanded).toBe(false);
			expect(displayedItems[1].expanded).toBe(false);
		});
	});

	describe('onParentChange', () => {
		it('should select all children when parent is selected and no child is selected', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			const event = {};
			const item = { key: 'foo' };

			wrapper.instance().onParentChange(event, item);

			// then
			const { value } = wrapper.state();
			expect(value.foo).toEqual(['foo_1', 'foo_2']);
		});

		it('should unselect all children when parent is selected and at least a child is already selected', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			wrapper.setState({ value: { foo: ['foo_2'] } });
			const event = {};
			const item = { key: 'foo' };

			wrapper.instance().onParentChange(event, item);

			// then
			const { value } = wrapper.state();
			expect(value.foo).toEqual([]);
		});
	});

	describe('onChange', () => {
		it('should call both onChange and onFinish props', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			const event = {};
			const value = { bar: ['baz'] };

			wrapper.instance().onChange(event, value);

			// then
			expect(props.onChange).toHaveBeenCalledWith(event, {
				schema: props.schema,
				value,
			});

			expect(props.onFinish).toHaveBeenCalledWith(event, {
				schema: props.schema,
				value,
			});
		});
	});

	describe('onCheck', () => {
		it('should add a value', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			const event = {};
			const checked = { value: 'Bar_2' };
			const parent = { key: 'bar' };

			wrapper.instance().onCheck(event, checked, parent);

			// then
			expect(wrapper.state('value')).toEqual({ bar: ['Bar_2'] });
		});

		it('should remove a value', () => {
			// given
			props.value = { bar: ['Bar_1', 'Bar_2'] };

			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			const event = {};
			const checked = { value: 'Bar_2' };
			const parent = { key: 'bar' };

			wrapper.instance().onCheck(event, checked, parent);

			// then
			expect(wrapper.state('value')).toEqual({ bar: ['Bar_1'] });
		});
	});

	describe('onInputChange', () => {
		it('should debounced-refresh items props', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			const event = {};
			const item = { value: 'foo' };

			wrapper.instance().onInputChange(event, item);
			jest.runAllTimers();

			// then
			expect(setTimeout).toHaveBeenCalled();
			expect(wrapper.state('searchCriteria')).toEqual('foo');
		});
	});

	describe('onInputKeyDown', () => {
		const event = {
			preventDefault: jest.fn(),
		};

		beforeEach(() => {
			event.preventDefault.mockReset();
		});

		it('should manage enter key pressed', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			event.keyCode = 13;

			wrapper.instance().onInputKeyDown(event);

			// then
			expect(event.preventDefault).toHaveBeenCalled();
		});

		it('should manage esc key pressed', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);
			event.keyCode = 27;

			wrapper.instance().onInputKeyDown(event);

			// then
			expect(event.preventDefault).toHaveBeenCalled();
			expect(wrapper.state('displayMode')).toEqual('DISPLAY_MODE_DEFAULT');
		});
	});

	describe('switchToSearchMode', () => {
		it('should switch to "search" mode in the state', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);

			wrapper.instance().switchToSearchMode();

			// then
			expect(wrapper.state('displayMode')).toEqual('DISPLAY_MODE_SEARCH');
		});
	});

	describe('switchToDefaultMode', () => {
		it('should switch to "default" mode in the state', () => {
			// when
			const wrapper = shallow(<NestedListViewWidget {...props} />);

			wrapper.instance().switchToDefaultMode();

			// then
			expect(wrapper.state('displayMode')).toEqual('DISPLAY_MODE_DEFAULT');
		});
	});
});

describe('NestedListView utils', () => {
	describe('initItems', () => {
		it('should init items props', () => {
			// given
			const schema = {
				items: [
					{
						title: 'Bar',
						key: ['foo', 'bar'],
						titleMap: [{ label: 'Baz', value: 'baz' }, { label: 'Boo', value: 'boo' }],
					},
				],
				required: true,
				emptyLabel: 'emptyLabel',
				title: 'title',
				noResultLabel: 'noResultLabel',
				placeholder: 'placeholder',
			};

			const value = [];
			const searchCriteria = '';
			const toggledChildren = [];

			const callbacks = {
				onExpandToggle: jest.fn(),
				onParentChange: jest.fn(),
				onCheck: jest.fn(),
			};

			// when
			const props = initItems(schema, value, searchCriteria, toggledChildren, callbacks);

			// then
			expect(props.items[0].onExpandToggle).toBe(callbacks.onExpandToggle);
			expect(props.items[0].onChange).toBe(callbacks.onParentChange);
			expect(props.items[0].children[0].onChange).toBe(callbacks.onCheck);
			expect(props.items[0].children[1].onChange).toBe(callbacks.onCheck);
			expect(props.displayedItems).toHaveLength(1);
			expect(props.displayedItems[0].children).toHaveLength(2);
		});
	});
});
