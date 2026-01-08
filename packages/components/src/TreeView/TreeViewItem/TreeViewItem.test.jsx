import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TreeViewItem, { getItemIcon } from './TreeViewItem.component';

jest.unmock('@talend/design-system');

const item = {
	id: 1,
	name: 'grandpa',
	actions: [
		{
			action: () => 'itemRemoveCallback',
			icon: 'talend-trash',
			label: 'remove element',
		},
	],
	children: [
		{
			id: 11,
			name: 'mami',
			toggled: true,
			children: [
				{ id: 111, name: 'me' },
				{ id: 112, name: 'bro' },
			],
		},
		{
			id: 12,
			name: 'aunt',
			toggled: false,
			children: [{ id: 121, name: 'cousin' }],
		},
	],
	toggled: true,
	counter: 101,
	showCounter: true,
};
const itemWithIcon = {
	name: 'grandpa',
	icon: {
		name: 'src-http://static.pokemonpets.com/images/monsters-images-300-300/106-Hitmonlee.png',
		title: 'A pokemon',
	},
	actions: [
		{
			action: () => 'itemRemoveCallback',
			icon: 'talend-trash',
			label: 'remove element',
		},
	],
	toggled: true,
	counter: 101,
	showCounter: true,
};

const itemWithIconAndTooltip = {
	...itemWithIcon,
	icon: {
		name: 'talend-versioning',
		tooltipLabel: 'New version of the Pokemon is available',
	},
};

const items = [item, { id: 2, name: 'grandma' }, { id: 3, name: 'granduncle' }, itemWithIcon];

const defaultProps = {
	id: 'my-treeview',
	index: 1,
	item,
	level: 2,
	onKeyDown: jest.fn(),
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
	siblings: items,
};
const propsWithIcons = {
	id: 'my-treeview',
	index: 1,
	item: itemWithIcon,
	level: 2,
	onKeyDown: jest.fn(),
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
	siblings: items,
};

function getIcon() {
	return document.querySelector('.tc-icon');
}

describe('getItemIcon', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});
	afterAll(() => {
		jest.useRealTimers();
	});
	it('should return given icon when toggled', () => {
		expect(getItemIcon('my', true)).toBe('my');
	});

	it('should return closed version of the given icon when not toggled', () => {
		expect(getItemIcon('my', false)).toBe('my-closed');
	});

	it('should return talend-folder icon when toggled without icon name', () => {
		expect(getItemIcon(undefined, true)).toBe('talend-folder');
	});

	it('should return talend-folder-closed icon when not toggled and without icon name', () => {
		expect(getItemIcon(undefined, false)).toBe('talend-folder-closed');
	});
});

describe('TreeView item', () => {
	it('should render', () => {
		// when
		const { container } = render(<TreeViewItem {...defaultProps} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render items with icon', () => {
		// when
		render(<TreeViewItem {...propsWithIcons} />);

		// then
		expect(getIcon()).toBeInTheDocument();
		expect(getIcon()).toHaveAttribute(
			'src',
			'http://static.pokemonpets.com/images/monsters-images-300-300/106-Hitmonlee.png',
		);
	});

	it('test disabled item not calling onSelect', async () => {
		const user = userEvent.setup();

		// when
		const onSelect = jest.fn();
		const props = {
			...defaultProps,
			item: {
				...defaultProps.item,
				disabled: true,
			},
		};

		render(<TreeViewItem {...props} onSelect={onSelect} />);
		await user.click(screen.getByRole('treeitem'));
		await user.keyboard('{Enter}');

		// then
		expect(onSelect.mock.calls.length).toBe(0);
		expect(screen.getByRole('treeitem')).toHaveAttribute('aria-disabled', 'true');
	});

	it('should render items with icon and tooltip', async () => {
		const user = userEvent.setup();

		// when
		const propsWithIconAndTooltip = {
			...propsWithIcons,
			item: itemWithIconAndTooltip,
		};

		render(<TreeViewItem {...propsWithIconAndTooltip} />);
		expect(getIcon()).toBeInTheDocument();
		await user.hover(getIcon());
		expect(await screen.findByText('New version of the Pokemon is available')).toBeInTheDocument();
	});

	it('should render items with classNames', () => {
		// when
		const propsWithIconAndTooltip = {
			...propsWithIcons,
			item: { ...itemWithIcon, className: 'test-class' },
		};

		render(<TreeViewItem {...propsWithIconAndTooltip} />);
		expect(screen.getByRole('treeitem')).toHaveClass('test-class');
	});

	it('should toggle item on toggle button click', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			...defaultProps,
			onToggle: jest.fn(),
		};
		render(<TreeViewItem {...props} />);

		// when
		await user.click(getIcon());

		// then
		expect(props.onToggle).toHaveBeenCalledWith(expect.anything({ type: 'click' }), props.item);
	});

	it('should select item on click', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			...defaultProps,
			onSelect: jest.fn(),
		};
		render(<TreeViewItem {...props} />);

		// when
		await user.click(screen.getByRole('treeitem'));

		// then
		expect(props.onSelect).toHaveBeenCalledWith(expect.anything({ type: 'click' }), props.item);
	});
});
