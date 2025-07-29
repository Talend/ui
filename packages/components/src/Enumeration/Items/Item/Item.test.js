import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cloneDeep from 'lodash/cloneDeep';

import Item from './Item.component';

jest.unmock('@talend/design-system');

const item = {
	values: ['toto'],
	itemProps: {
		key: 'values',
		onSubmitItem: jest.fn(),
		onAbortItem: jest.fn(),
		onSelectItem: jest.fn(),
		actions: [
			{
				label: 'Edit',
				id: 'edit',
				onClick: jest.fn(),
			},
			{
				label: 'Delete',
				id: 'delete',
				onClick: jest.fn(),
			},
		],
	},
};

describe('Item', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it('should display value with three buttons and trigger callback on button title click', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			item,
		};
		render(<Item {...props} />);

		// then
		await user.click(screen.getByLabelText('Delete'));
		expect(props.item.itemProps.actions[1].onClick).toHaveBeenCalled();

		await user.click(screen.getByLabelText('Edit'));
		expect(props.item.itemProps.actions[0].onClick).toHaveBeenCalled();

		await user.click(screen.getByText('toto'));
		expect(props.item.itemProps.onSelectItem).toHaveBeenCalled();
	});

	it('should display value with only button which are not disabled', () => {
		// given
		const itemWithDisabled = cloneDeep(item);
		itemWithDisabled.itemProps.actions[0].disabled = true;
		const props = {
			item: itemWithDisabled,
		};

		render(<Item {...props} />);

		// then
		expect(screen.getByLabelText('Delete')).toBeVisible();
		expect(screen.queryByLabelText('Edit')).not.toBeInTheDocument();
	});

	it('should display a label if "item[key]" is a string', () => {
		const props = {
			item: {
				...item,
				values: 'toto',
			},
		};

		render(<Item {...props} />);
		expect(screen.getByText('toto')).toBeVisible();
	});

	it('should display the item with an icon appended', () => {
		const props = {
			item: {
				...item,
				icon: {
					name: 'talend-warning',
					title: 'mad world',
				},
			},
		};

		render(<Item {...props} />);
		expect(screen.getAllByRole('gridcell')[0].querySelector('svg')).toHaveAttribute(
			'title',
			'mad world',
		);
	});

	it('should display the item with a class on button', () => {
		const props = {
			item: {
				...item,
				className: 'special',
			},
		};
		render(<Item {...props} />);

		expect(screen.getByText('toto').parentElement).toHaveClass('special');
	});
});
