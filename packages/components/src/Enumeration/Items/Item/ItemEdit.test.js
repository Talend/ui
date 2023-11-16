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
	it('should display value with two buttons and trigger callback on button title click', async () => {
		const user = userEvent.setup();

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
		await user.click(screen.getByLabelText('Cancel'));

		// then
		expect(props.item.itemProps.actions[1].onClick).toHaveBeenCalled();
	});

	it('should trigger callback on input title ENTER', async () => {
		const user = userEvent.setup();

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
		await user.click(input);
		input.value = '';
		await user.type(input, 'my new title');
		await user.keyboard('{Enter}');

		// then
		expect(props.item.itemProps.onSubmitItem).toHaveBeenCalled();
		const callArgs = props.item.itemProps.onSubmitItem.mock.calls[0];
		expect(callArgs[1]).toEqual({ value: 'my new title', model: props.item, index: 0 });
	});

	it('should trigger callback on input title ESC', async () => {
		const user = userEvent.setup();

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
		await user.click(screen.getAllByRole('gridcell')[0]);
		await user.keyboard('{Escape}');

		// then
		expect(props.item.itemProps.onAbortItem).toHaveBeenCalled();
		const callArgs = props.item.itemProps.onAbortItem.mock.calls[0];
		expect(callArgs[1]).toEqual({ value: 'toto', model: props.item, index: 0 });
	});
});
