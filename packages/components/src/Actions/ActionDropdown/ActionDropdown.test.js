import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cases from 'jest-in-case';
import ActionDropdown, { InjectDropdownMenuItem, getMenuItem } from './ActionDropdown.component';

jest.unmock('@talend/design-system');

function getComponent(key, options) {
	if (options?.key) {
		return options.key;
	}
	const Fake = props => <div role={key} {...props} />;
	Fake.displayName = key;
	return Fake;
}

describe('ActionDropdown', () => {
	it('should call onToggle callback when click on trigger', () => {
		// given
		const onToggle = jest.fn();
		const props = {
			id: 'dropdwon-id',
			label: 'Dropdown',
			onToggle,
			items: [
				{ id: 'item1', label: 'Item 1', model: 'model' },
				{ id: 'item2', label: 'Item 2', model: 'model' },
			],
		};

		render(<ActionDropdown {...props} />);
		const dropdownButton = screen.getByRole('button');

		// when
		userEvent.click(dropdownButton);

		// then
		expect(onToggle).toBeCalledWith(true);

		// when
		userEvent.click(dropdownButton);

		// then
		expect(onToggle).toBeCalledWith(false);
	});

	it('should call onSelect callback when click on item', () => {
		// given
		const onSelectClick = jest.fn();
		const onItemClick = jest.fn();
		const props = {
			id: 'dropdwon-id',
			label: 'Dropdown',
			onSelect: onSelectClick,
			items: [
				{ id: 'item1', label: 'Item 1', onClick: onItemClick, model: 'model' },
				{ id: 'item2', label: 'Item 2', onClick: onItemClick, model: 'model' },
			],
		};
		render(<ActionDropdown {...props} />);

		// when
		userEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }));

		// then
		expect(onSelectClick).toBeCalledWith(expect.anything(), props.items[0]);
		expect(onItemClick.mock.calls[0][1]).toEqual({
			action: { id: 'item1', label: 'Item 1' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[0][0].type).toBe('click');

		// when
		userEvent.click(screen.getByRole('menuitem', { name: 'Item 2' }));

		// then
		expect(onSelectClick).toBeCalledWith(expect.anything(), props.items[1]);
		expect(onItemClick.mock.calls[1][1]).toEqual({
			action: { id: 'item2', label: 'Item 2' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[1][0].type).toBe('click');
	});

	it('should apply transformation on icon', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'Button label',
			icon: 'talend-ellipsis',
			iconTransform: 'rotate-90',
		};

		// when
		render(<ActionDropdown {...props} />);
		const icon = screen.getByRole('button').firstChild;

		// then
		expect(icon).toHaveClass('theme-rotate-90');
		expect(icon).toHaveClass('tc-icon');
	});
});

describe('getMenuItem', () => {
	it('should return a MenuItem with divider', () => {
		render(getMenuItem({ divider: true }));
		expect(screen.getByRole('separator')).toBeInTheDocument();
	});
	it('should return a MenuItem with icon and label', () => {
		render(getMenuItem({ label: 'Toto', icon: 'talend-bell', 'data-feature': 'action.feature' }));
		expect(screen.getByRole('menuitem')).toBeInTheDocument();
		expect(screen.getByRole('menuitem')).toHaveTextContent('Toto');
		expect(screen.getByRole('menuitem')).toHaveAttribute('data-feature', 'action.feature');
	});
	it('should return a MenuItem with label', () => {
		render(getMenuItem({ label: 'Toto', 'data-feature': 'action.feature' }));
		expect(screen.getByRole('menuitem')).toBeInTheDocument();
		expect(screen.getByRole('menuitem')).toHaveTextContent('Toto');
		expect(screen.getByRole('menuitem')).toHaveAttribute('data-feature', 'action.feature');
	});
});

describe('InjectDropdownMenuItem', () => {
	it('should render MenuItem with props divider', () => {
		render(
			<InjectDropdownMenuItem
				getComponent={getComponent}
				key={0}
				menuItemProps={{ stuff: 'MyItemProps' }}
				divider
			/>,
		);
		expect(screen.getByRole('separator')).toBeInTheDocument();
	});
	it('should render MenuItem with Inject', () => {
		render(
			<InjectDropdownMenuItem
				getComponent={getComponent}
				component="Action"
				key={0}
				menuItemProps={{ stuff: 'MyItemProps' }}
				onSelect={jest.fn()}
				onKeyDown={jest.fn()}
				withMenuItem
			/>,
		);
		expect(screen.getByRole('menuitem')).toBeInTheDocument();
	});
	it('should render li with Inject', () => {
		render(
			<InjectDropdownMenuItem
				getComponent={getComponent}
				component="Action"
				key={0}
				liProps={{ stuff: 'MyLiProps' }}
			/>,
		);
		expect(screen.getByRole('listitem')).toBeInTheDocument();
	});
});

describe('Dropup', () => {
	function testSwitch({ containerPosition, menuPosition, isInitialDropup, isDropupExpected }) {
		// given
		// const container = screen.document.createElement('div');
		// container.classList.add('tc-dropdown-container');
		// container.getBoundingClientRect = () => containerPosition;
		const { container } = render(
			<div className="tc-dropdown-container">
				<ActionDropdown
					items={[{ label: 'item 1' }, { label: 'item 2' }]}
					dropup={isInitialDropup}
				/>
				,
			</div>,
		);
		container.firstChild.getBoundingClientRect = () => containerPosition;
		// eslint-disable-next-line testing-library/no-container
		container.querySelector('.dropdown-menu').getBoundingClientRect = () => menuPosition;

		// when
		userEvent.click(screen.getByRole('button'));

		// then
		if (!isDropupExpected) {
			expect(container.firstChild.firstChild).not.toHaveClass('dropup');
		} else {
			expect(container.firstChild.firstChild).toHaveClass('dropup');
		}
	}

	cases('dropdown/dropup switch', testSwitch, [
		{
			name: 'should dropup on dropdown bottom overflow',
			containerPosition: { top: 60, bottom: 95 },
			menuPosition: { top: 80, bottom: 100, height: 20 },
			isInitialDropup: false,
			isDropupExpected: true,
		},
		{
			name: 'should dropdown on dropup top overflow',
			containerPosition: { top: 0, bottom: 35 },
			menuPosition: { top: -5, bottom: 0 },
			isInitialDropup: true,
			isDropupExpected: false,
		},
		{
			name: 'should do nothing on dropdown without overflow',
			containerPosition: { top: 60, bottom: 95 },
			menuPosition: { top: 80, bottom: 90, height: 10 },
			isInitialDropup: false,
			isDropupExpected: false,
		},
		{
			name: 'should do nothing on dropup without overflow',
			containerPosition: { top: 0, bottom: 60 },
			menuPosition: { top: 20, bottom: 30 },
			isInitialDropup: true,
			isDropupExpected: true,
		},
		{
			name: 'should do nothing on dropdown without enough space (top and bottom)',
			containerPosition: { top: 10, bottom: 30 },
			menuPosition: { top: 20, bottom: 90, height: 60 },
			isInitialDropup: false,
			isDropupExpected: false,
		},
	]);
});
