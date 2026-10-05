import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import ActionSplitDropdown from './ActionSplitDropdown.component';

const items = [
	{
		label: 'From Local',
		onClick: jest.fn(),
		'data-feature': 'action.local',
	},
	{
		label: 'From Remote',
		onClick: jest.fn(),
		'data-feature': 'action.remote',
	},
];

describe('ActionSplitDropdown', () => {
	it('blocks HTML injection on divider items and keeps ordinary menu props', () => {
		const { container } = render(
			<ActionSplitDropdown
				label="Add File"
				items={[
					{
						divider: true,
						dangerouslySetInnerHTML: { __html: '<img data-injected="true" src="x" />' },
					},
					{ label: 'Item', title: 'Item title', 'data-testid': 'menu.item', lang: 'fr' },
				]}
			/>,
		);
		expect(container.querySelector('[data-injected]')).toBeNull();
		expect(screen.getByTestId('menu.item')).toHaveAttribute('lang', 'fr');
		expect(screen.getByRole('menuitem', { name: 'Item' })).toHaveAttribute('title', 'Item title');
	});

	it('should render a11y html', async () => {
		render(
			<main>
				<ActionSplitDropdown label="Add File" items={items} />
			</main>,
		);
		expect((await axe(document.body)).violations).toEqual([]);
	});

	it('should render a button with label', () => {
		// given
		const props = {
			label: 'Add File',
			onClick: jest.fn(),
			'data-feature': 'action.add',
			items,
		};

		// when
		render(<ActionSplitDropdown {...props} />);

		// then
		expect(screen.getByText('Add File')).toBeInTheDocument();
	});

	it('should render a button with icon and label', () => {
		// given
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			onClick: jest.fn(),
			'data-feature': 'action.add',
			items,
		};

		// when
		render(<ActionSplitDropdown {...props} />);

		// then
		expect(screen.getByText('Add File')).toBeInTheDocument();
		expect(screen.getByText('Add File').previousSibling).toHaveAttribute('name', 'fa fa-plus');
	});

	it('should render items with icons', () => {
		// given
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			onClick: jest.fn(),
			'data-feature': 'action.add',
			items: [
				{
					label: 'From Local',
					onClick: jest.fn(),
					icon: 'my-icon',
				},
				{
					label: 'From Remote',
					onClick: jest.fn(),
					icon: 'my-other-icon',
				},
			],
		};

		// when
		render(<ActionSplitDropdown {...props} />);

		// then
		expect(screen.getByText('From Local')).toBeInTheDocument();
		expect(screen.getByText('From Local').childNodes[0]).toHaveAttribute('name', 'my-icon');
		expect(screen.getByText('From Remote')).toBeInTheDocument();
		expect(screen.getByText('From Remote').childNodes[0]).toHaveAttribute('name', 'my-other-icon');
	});

	it('should render "no option" item when items array is empty', () => {
		// given
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			onClick: jest.fn(),
			'data-feature': 'action.add',
			items: [],
			emptyDropdownLabel: 'No option',
		};

		// when
		render(<ActionSplitDropdown {...props} />);

		// then
		expect(screen.getByText('No option')).toBeInTheDocument();
	});

	it('should render trigger event', async () => {
		const user = userEvent.setup();

		// given
		const onItemClick = jest.fn();
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			items: [
				{
					id: 'item1',
					label: 'Item 1',
					onClick: onItemClick,
					model: 'model',
				},
				{
					id: 'item2',
					label: 'Item 2',
					onClick: onItemClick,
					model: 'model',
				},
			],
		};

		// when
		render(<ActionSplitDropdown {...props} />);
		await user.click(screen.getByRole('menuitem', { name: 'Item 1' }));

		// then
		expect(onItemClick.mock.calls[0][1]).toEqual({
			action: { id: 'item1', label: 'Item 1' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[0][0].type).toEqual('click');

		// when
		await user.click(screen.getByRole('menuitem', { name: 'Item 2' }));

		// then
		expect(onItemClick.mock.calls[1][1]).toEqual({
			action: { id: 'item2', label: 'Item 2' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[1][0].type).toEqual('click');
	});
});

describe('ActionSplitDropdown componentClass hardening', () => {
	it('should ignore componentClass coming from props', () => {
		render(<ActionSplitDropdown label="x" items={items} componentClass="base" />);
		expect(document.querySelector('base')).toBeNull();
	});

	it('should ignore componentClass coming from items', async () => {
		const user = userEvent.setup();
		const withClass = [{ label: 'a', onClick: jest.fn(), componentClass: 'iframe' }];
		render(<ActionSplitDropdown label="x" items={withClass} />);
		await user.click(screen.getByLabelText(/Open x menu/));
		expect(screen.getByText('a')).toBeVisible();
		expect(document.querySelector('iframe')).toBeNull();
	});
});
