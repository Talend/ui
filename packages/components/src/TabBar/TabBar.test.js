import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabBar from './TabBar.component';
import { ActionButton } from '../Actions';

const tabProps = {
	id: 'my-tabs',
	className: 'tabs-classname',
	items: [
		{
			key: '1',
			label: 'Tab1',
			'data-feature': 'action.1',
		},
		{
			key: '2',
			label: 'Tab2',
			'data-feature': 'action.2',
		},
		{
			key: '3',
			label: 'Tab3',
			'data-feature': 'action.3',
		},
		{
			key: '4',
			label: 'Tab4',
			'data-feature': 'action.4',
		},
		{
			key: '5',
			label: 'Tab5',
			'data-feature': 'action.5',
		},
	],
	onSelect: jest.fn(),
	selectedKey: '3',
};

const rightProps = {
	...tabProps,
	right: (
		<ActionButton
			id="rightButton"
			className="btn-inverse"
			label="Add"
			bsStyle="info"
			icon="talend-plus-circle"
			onClick={() => {}}
		/>
	),
};

describe('TabBar component', () => {
	it('should render with selected children managed by user', () => {
		// given

		// when
		render(<TabBar {...tabProps}>I'm the content</TabBar>);

		// then
		expect(screen.getByText("I'm the content")).toBeInTheDocument();
		expect(screen.getByText('Tab3').closest('button')).toHaveAttribute('aria-selected', 'true');
		// note getbyrole check the visibility of the element
		expect(screen.getAllByRole('tabpanel').length).toBe(1);
		expect(document.querySelectorAll('[role="tabpanel"]').length).toBe(5);
	});

	it('should render with right children', () => {
		// given

		// when
		render(<TabBar {...rightProps}>I'm the content</TabBar>);

		// then
		expect(screen.getByText("I'm the content")).toBeInTheDocument();
		// it is displayed just after the ul of tabs
		expect(screen.getByText('Add').closest('button').previousSibling).toBe(
			screen.getByRole('tablist'),
		);
	});

	it('should render with selected children from item definition', () => {
		// given
		const items = tabProps.items.map((item, index) => ({
			...item,
			children: <div data-testid="item">child {index}</div>,
		}));

		// when
		render(<TabBar {...tabProps} items={items} />);

		// then only tab3 is visible
		expect(screen.getByRole('tabpanel')).toHaveTextContent('child 2');
	});

	it('should select item on click', async () => {
		const user = userEvent.setup();

		// given
		const onSelect = jest.fn();
		render(<TabBar {...tabProps} onSelect={onSelect} />);

		// when
		await user.click(screen.getByText('Tab1'));

		// then
		expect(onSelect).toHaveBeenCalledWith(expect.anything(), tabProps.items[0]);
	});

	it('should select first item on home keydown', async () => {
		// given
		const onSelect = jest.fn();
		render(<TabBar {...tabProps} onSelect={onSelect} />);

		// when
		const root = document.querySelector('#my-tabs > div');
		fireEvent.keyDown(root, {
			key: 'Home',
		});

		// then
		expect(onSelect).toHaveBeenCalledWith(expect.anything(), tabProps.items[0]);
	});

	it('should select last item on end keydown', () => {
		// given
		const onSelect = jest.fn();
		render(<TabBar {...tabProps} onSelect={onSelect} />);

		// when
		const root = document.querySelector('#my-tabs > div');
		fireEvent.keyDown(root, {
			key: 'End',
		});

		// then
		expect(onSelect).toHaveBeenCalledWith(expect.anything(), tabProps.items[4]);
	});

	it('should render with badges', () => {
		const props = {
			...tabProps,
			selectedKey: '1',
			items: [
				{
					key: '1',
					label: 'Tab1',
					badge: {
						label: '967',
						className: 'custom-class-name',
					},
					'data-feature': 'action.1',
				},
				{
					key: '2',
					label: 'Tab2',
					badge: {
						label: '1287',
						bsStyle: 'info',
					},
					'data-feature': 'action.2',
				},
			],
		};

		render(<TabBar {...props}>I'm the content</TabBar>);
		expect(screen.getByText('967')).toHaveClass('tc-tab-bar-item-badge custom-class-name');
	});
});
