/* eslint-disable import/imports-first */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cases from 'jest-in-case';

import Tree from '../__mocks__/tree';
import { withTreeGesture } from './withTreeGesture';

// Legend : the comments indicates 2 numbers, level and index
// Those are used in the following tests
// "// level index"
const treeProps = {
	items: [
		{ id: 0, name: 'Zero' }, // 0 0
		{
			id: 1,
			name: 'First',
			hasChildren: true,
			isOpened: true,
			children: [
				{ id: 10, name: 'Ten' }, // 1 0
				{
					id: 11,
					name: 'Eleven',
					hasChildren: true,
					isOpened: false,
					children: [
						{ id: 110 }, // 2 0
						{ id: 111 }, // 2 1
						{ id: 112 }, // 2 2
					],
				}, // 1 1
				{ id: 12, name: 'Twelve' }, // 1 2
			],
		}, // 0 1
		{ id: 2, name: 'Two' }, // 0 2
		{ id: 3, name: 'Three' }, // 0 3
	],
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
};

const ComponentWithGesture = withTreeGesture(Tree);

describe('TreeGesture HOC', () => {
	it('should wrap Tree component', () => {
		// then
		expect(ComponentWithGesture.displayName).toBe('TreeGesture(Tree)');
	});

	it('should select item on enter keydown', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			...treeProps,
			onSelect: jest.fn(),
		};
		render(<ComponentWithGesture {...props} />);
		expect(props.onSelect).not.toHaveBeenCalled();

		// when
		screen.getByText('Zero').focus();
		await user.keyboard('[Enter]');

		// then
		expect(props.onSelect).toHaveBeenCalledWith(expect.anything(), props.items[0]);
	});

	it('should select item on space keydown', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			...treeProps,
			onSelect: jest.fn(),
		};
		render(<ComponentWithGesture {...props} />);
		expect(props.onSelect).not.toHaveBeenCalled();

		// when
		screen.getByText('Zero').focus();
		await user.keyboard('[Space]');

		// then
		expect(props.onSelect).toHaveBeenCalledWith(expect.anything(), props.items[0]);
	});

	it('should toggle opened item on left keydown', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			...treeProps,
			onToggle: jest.fn(),
		};
		render(<ComponentWithGesture {...props} />);
		// const event = { key: 'ArrowLeft', stopPropagation: jest.fn() };
		expect(props.onToggle).not.toHaveBeenCalled();

		// when
		screen.getByText('First').focus();
		await user.keyboard('[ArrowLeft]');

		// wrapper.find(getSelector({ level: 0, posinset: 1 })).simulate('keydown', event);

		// then
		expect(props.onToggle).toHaveBeenCalledWith(expect.anything(), props.items[1]);
	});

	it('should toggle closed item on right keydown', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			...treeProps,
			onToggle: jest.fn(),
		};
		render(<ComponentWithGesture {...props} />);
		expect(props.onToggle).not.toHaveBeenCalled();

		// when
		screen.getByText('Eleven').focus();
		await user.keyboard('[ArrowRight]');

		// then
		expect(props.onToggle).toHaveBeenCalledWith(expect.anything(), props.items[1].children[1]);
	});

	it('should open all siblings on * keydown', async () => {
		const user = userEvent.setup();

		// given
		const items = treeProps.items.slice();
		items[0] = { ...items[0], siblings: items };
		const props = {
			...treeProps,
			items,
			onToggleAllSiblings: jest.fn(),
		};
		render(<ComponentWithGesture {...props} />);
		expect(props.onToggleAllSiblings).not.toHaveBeenCalled();

		// when
		screen.getByText('Zero').focus();
		await user.keyboard('*');

		// then
		expect(props.onToggleAllSiblings).toHaveBeenCalledWith(expect.anything(), items);
	});

	async function testFocus({ elementPosition, expectedActivePosition, key }) {
		const user = userEvent.setup();

		// given
		render(<ComponentWithGesture {...treeProps} />);
		screen.getByText(elementPosition).focus();

		// when
		await user.keyboard(`[${key}]`);

		// then
		expect(screen.getByText(expectedActivePosition)).toHaveFocus();
	}

	cases('focus', testFocus, [
		{
			name: 'should focus its parent on left keydown',
			elementPosition: 'Eleven',
			expectedActivePosition: 'First',
			key: 'ArrowLeft',
		},
		{
			name: "should focus opened item's first child on right keydown",
			elementPosition: 'First',
			expectedActivePosition: 'Ten',
			key: 'ArrowRight',
		},
		{
			name: 'should focus next item on down keydown',
			elementPosition: 'Twelve',
			expectedActivePosition: 'Two',
			key: 'ArrowDown',
		},
		{
			name: 'should focus previous item on up keydown',
			elementPosition: 'Two',
			expectedActivePosition: 'Twelve',
			key: 'ArrowUp',
		},
		{
			name: 'should focus first item on home keydown',
			elementPosition: 'Twelve',
			expectedActivePosition: 'Zero',
			key: 'Home',
		},
		{
			name: 'should focus last item on end keydown',
			elementPosition: 'Ten',
			expectedActivePosition: 'Three',
			key: 'End',
		},
	]);
});
