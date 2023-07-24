import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ItemEdit from './ItemEdit.component';

const item = {
	id: 1,
	values: ['toto'],
	index: 0,
	itemProps: {
		key: 'values',
		onSubmitItem: jest.fn(),
		onAbortItem: jest.fn(),
		onChangeItem: jest.fn(),
		actions: [
			{
				label: 'Validate',
				id: 'validate',
				onClick: jest.fn(),
			},
			{
				label: 'Cancel',
				id: 'cancel',
				onClick: jest.fn(),
			},
		],
	},
};

describe('Item', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it('should display value with two buttons and trigger callback on button title click', () => {
		// given
		const props = {
			item,
			currentEdit: {
				validate: {
					disabled: false,
				},
			},
		};
		render(<ItemEdit {...props} />);

		// when
		userEvent.click(screen.getByLabelText('Cancel'));

		// then
		expect(props.item.itemProps.actions[1].onClick).toBeCalled();
	});

	it('should trigger callback on input title ENTER', () => {
		// given
		const props = {
			item,
			currentEdit: {
				validate: {
					disabled: false,
				},
			},
			itemProps: {
				key: 'values',
				onSubmitItem: jest.fn(),
				onAbortItem: jest.fn(),
				onChangeItem: jest.fn(),
				actions: [
					{
						label: 'Validate',
						id: 'validate',
						onClick: jest.fn(),
					},
					{
						label: 'Cancel',
						id: 'cancel',
						onClick: jest.fn(),
					},
				],
			},
		};

		render(<ItemEdit {...props} />);

		// when
		const input = screen.getAllByRole('gridcell')[0];
		userEvent.click(input);
		input.value = '';
		userEvent.type(input, 'my new title');
		userEvent.keyboard('{Enter}');

		// then
		expect(props.item.itemProps.onSubmitItem).toBeCalled();
		const callArgs = props.item.itemProps.onSubmitItem.mock.calls[0];
		expect(callArgs[1]).toEqual({ value: 'my new title', model: props.item, index: 0 });
	});

	it('should trigger callback on input title ESC', () => {
		// given
		const props = {
			item,
			currentEdit: {
				validate: {
					disabled: false,
				},
			},
			itemProps: {
				key: 'values',
				onSubmitItem: jest.fn(),
				onAbortItem: jest.fn(),
				actions: [
					{
						label: 'Validate',
						id: 'validate',
						onClick: jest.fn(),
					},
					{
						label: 'Cancel',
						id: 'cancel',
						onClick: jest.fn(),
					},
				],
			},
		};

		// when
		render(<ItemEdit {...props} />);
		userEvent.click(screen.getAllByRole('gridcell')[0]);
		userEvent.keyboard('{Escape}');

		// then
		expect(props.item.itemProps.onAbortItem).toBeCalled();
		const callArgs = props.item.itemProps.onAbortItem.mock.calls[0];
		expect(callArgs[1]).toEqual({ value: 'toto', model: props.item, index: 0 });
	});
});
