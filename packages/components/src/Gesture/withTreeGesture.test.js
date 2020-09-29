/* eslint-disable import/imports-first */
import React from 'react';
import keycode from 'keycode';
import { mount } from 'enzyme';
import cases from 'jest-in-case';
import withTreeGesture from './withTreeGesture';
import Tree from '../../__mocks__/tree';

// Legend : the comments indicates 2 numbers, level and index
// Those are used in the following tests
// "// level index"
const treeProps = {
	items: [
		{ id: 0 }, // 0 0
		{
			id: 1,
			hasChildren: true,
			isOpened: true,
			children: [
				{ id: 10 }, // 1 0
				{
					id: 11,
					hasChildren: true,
					isOpened: false,
					children: [
						{ id: 110 }, // 2 0
						{ id: 111 }, // 2 1
						{ id: 112 }, // 2 2
					],
				}, // 1 1
				{ id: 12 }, // 1 2
			],
		}, // 0 1
		{ id: 2 }, // 0 2
		{ id: 3 }, // 0 3
	],
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
};

const ComponentWithGesture = withTreeGesture(Tree);

function getSelector({ level, posinset }) {
	return `li[aria-level=${level}][aria-posinset=${posinset}]`;
}

describe('TreeGesture HOC', () => {
	it('should wrap Tree component', () => {
		// then
		expect(ComponentWithGesture.displayName).toBe('TreeGesture(Tree)');
	});

	it('should select item on enter keydown', () => {
		// given
		const props = {
			...treeProps,
			onSelect: jest.fn(),
		};
		const wrapper = mount(<ComponentWithGesture {...props} />);
		const event = { keyCode: keycode.codes.enter, stopPropagation: jest.fn() };
		expect(props.onSelect).not.toBeCalled();

		// when
		wrapper.find(getSelector({ level: 0, posinset: 0 })).simulate('keydown', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(props.onSelect).toBeCalledWith(expect.anything(), props.items[0]);
	});

	it('should select item on space keydown', () => {
		// given
		const props = {
			...treeProps,
			onSelect: jest.fn(),
		};
		const wrapper = mount(<ComponentWithGesture {...props} />);
		const event = { keyCode: keycode.codes.space, stopPropagation: jest.fn() };
		expect(props.onSelect).not.toBeCalled();

		// when
		wrapper.find(getSelector({ level: 0, posinset: 0 })).simulate('keydown', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(props.onSelect).toBeCalledWith(expect.anything(), props.items[0]);
	});

	it('should toggle opened item on left keydown', () => {
		// given
		const props = {
			...treeProps,
			onToggle: jest.fn(),
		};
		const wrapper = mount(<ComponentWithGesture {...props} />);
		const event = { keyCode: keycode.codes.left, stopPropagation: jest.fn() };
		expect(props.onToggle).not.toBeCalled();

		// when
		wrapper.find(getSelector({ level: 0, posinset: 1 })).simulate('keydown', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(props.onToggle).toBeCalledWith(expect.anything(), props.items[1]);
	});

	it('should toggle closed item on right keydown', () => {
		// given
		const props = {
			...treeProps,
			onToggle: jest.fn(),
		};
		const wrapper = mount(<ComponentWithGesture {...props} />);
		const event = { keyCode: keycode.codes.right, stopPropagation: jest.fn() };
		expect(props.onToggle).not.toBeCalled();

		// when
		wrapper.find(getSelector({ level: 1, posinset: 1 })).simulate('keydown', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(props.onToggle).toBeCalledWith(expect.anything(), props.items[1].children[1]);
	});

	it('should open all siblings on * keydown', () => {
		// given
		const items = treeProps.items.slice();
		items[0] = { ...items[0], siblings: items };
		const props = {
			...treeProps,
			items,
			onToggleAllSiblings: jest.fn(),
		};
		const wrapper = mount(<ComponentWithGesture {...props} />);
		const event = {
			nativeEvent: { key: '*' },
			stopPropagation: jest.fn(),
		};
		expect(props.onToggleAllSiblings).not.toBeCalled();

		// when
		wrapper.find(getSelector({ level: 0, posinset: 0 })).simulate('keydown', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(props.onToggleAllSiblings).toBeCalledWith(expect.anything(), items);
	});

	function testFocus({ elementPosition, expectedActivePosition, keyCode }) {
		// given
		const wrapper = mount(<ComponentWithGesture {...treeProps} />, { attachTo: document.body });
		const event = { keyCode };
		const element = wrapper.find(getSelector(elementPosition));
		const expectedActiveElementId = wrapper
			.find(getSelector(expectedActivePosition))
			.prop('id')
			.toString();

		// when
		element.simulate('keydown', event);

		// then
		expect(document.activeElement.getAttribute('id')).toBe(expectedActiveElementId);
		wrapper.detach();
	}

	/**
	 * The current data gives this tree. Legend : (level, poinset)
	 *   - (0, 0)
	 * > - (0, 1) (opened)
	 *        - (1, 0)
	 *      > - (1, 1) (closed)
	 *           - (2, 0)
	 *           - (2, 1)
	 *           - (2, 2)
	 *        - (1, 2)
	 *   - (0, 2)
	 *   - (0, 3)
	 */
	cases('focus', testFocus, [
		{
			name: 'should focus its parent on left keydown',
			elementPosition: { level: 1, posinset: 1 },
			expectedActivePosition: { level: 0, posinset: 1 },
			keyCode: keycode.codes.left,
		},
		{
			name: "should focus opened item's first child on right keydown",
			elementPosition: { level: 0, posinset: 1 },
			expectedActivePosition: { level: 1, posinset: 0 },
			keyCode: keycode.codes.right,
		},
		{
			name: 'should focus next item on down keydown',
			elementPosition: { level: 1, posinset: 2 },
			expectedActivePosition: { level: 0, posinset: 2 },
			keyCode: keycode.codes.down,
		},
		{
			name: 'should focus previous item on up keydown',
			elementPosition: { level: 0, posinset: 2 },
			expectedActivePosition: { level: 1, posinset: 2 },
			keyCode: keycode.codes.up,
		},
		{
			name: 'should focus first item on home keydown',
			elementPosition: { level: 1, posinset: 2 },
			expectedActivePosition: { level: 0, posinset: 0 },
			keyCode: keycode.codes.home,
		},
		{
			name: 'should focus last item on end keydown',
			elementPosition: { level: 1, posinset: 0 },
			expectedActivePosition: { level: 0, posinset: 3 },
			keyCode: keycode.codes.end,
		},
	]);
});
