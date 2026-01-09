/* eslint-disable react/prop-types */
import { render, screen, configure, within } from '@testing-library/react';
import ActionBar from './ActionBar.component';
configure({ testIdAttribute: 'data-test' });

const primaryAction = {
	label: 'Primary',
	icon: 'fa fa-asterisk',
	onClick: jest.fn(),
	bsStyle: 'primary',
};

const secondaryAction = {
	label: 'Secondary',
	icon: 'fa fa-asterisk',
	onClick: jest.fn(),
};

const splitAction = {
	displayMode: 'splitDropdown',
	label: 'Add File',
	icon: 'fa fa-plus',
	onClick: jest.fn(),
	items: [
		{
			label: 'From Local',
			onClick: jest.fn(),
		},
		{
			label: 'From Remote',
			onClick: jest.fn(),
		},
	],
	emptyDropdownLabel: 'No option',
};

describe('ActionBar', () => {
	it('should trigger onClick callback on Action click', () => {
		// given
		const onClickMock = jest.fn();
		const props = {
			selected: 0,
			actions: {
				left: [{ label: 'Preparations', icon: 'fa fa-asterisk', onClick: onClickMock }],
			},
		};

		// when
		const actionBar = <ActionBar {...props} />;
		render(actionBar);
		screen.getByText('Preparations').click();

		// then
		expect(onClickMock).toHaveBeenCalled();
	});

	it('should support custom component', () => {
		// given
		function MyAction(props) {
			return (
				<div className="my-custom-action" {...props}>
					{props.label}
				</div>
			);
		}
		const props = {
			selected: 0,
			actions: {
				left: [{ label: 'Preparations', icon: 'talend-preparation' }],
			},
			getComponent: key => {
				if (key === 'Action') {
					return MyAction;
				}
				return undefined;
			},
		};

		// when
		const actionBar = <ActionBar {...props} />;
		render(actionBar);
		const element = screen.getByText('Preparations');

		// then
		expect(element).toHaveClass('my-custom-action');
	});

	it('should render the number of selected items', () => {
		// given
		const props = {
			selected: 12,
			multiSelectActions: {
				left: [{ id: 'remove-items', label: 'Delete', icon: 'talend-trash' }],
			},
		};

		// when
		render(<ActionBar {...props} />);
		// then
		expect(screen.getByTestId('selected-count')).toHaveTextContent(`${props.selected} selected`);
	});

	it('should not render the number of selected items', () => {
		// given
		const props = {
			selected: 12,
			hideCount: true,
			multiSelectActions: {
				left: [{ id: 'remove-items', label: 'Delete', icon: 'talend-trash' }],
			},
		};

		// when
		render(<ActionBar {...props} />);

		// then
		expect(screen.queryByTestId('selected-count')).not.toBeInTheDocument();
	});

	it('should render no-selected actions, all on left ', () => {
		// given
		const props = {
			selected: 0,
			actions: {
				left: [primaryAction, secondaryAction, splitAction],
			},
		};
		// when
		render(<ActionBar {...props} />);
		const left = document.getElementsByClassName('navbar-left')[0];
		// then

		expect(within(left).getByText('Primary')).toBeInTheDocument();
		expect(within(left).getByText('Secondary')).toBeInTheDocument();
		expect(within(left).getByText('Add File')).toBeInTheDocument();
	});
	it('should render no-selected actions, some on left, the other on right', () => {
		// given
		const props = {
			selected: 0,
			actions: {
				left: [primaryAction],
				right: [secondaryAction, splitAction],
			},
		};
		// when
		render(<ActionBar {...props} />);
		const left = document.getElementsByClassName('navbar-left')[0];
		const right = document.getElementsByClassName('navbar-right')[0];
		// then
		expect(within(left).getByText('Primary')).toBeInTheDocument();
		expect(within(right).getByText('Secondary')).toBeInTheDocument();
		expect(within(right).getByText('Add File')).toBeInTheDocument();
	});
	it('should render no-selected actions, all on right', () => {
		// given
		const props = {
			selected: 0,
			actions: {
				right: [primaryAction, secondaryAction, splitAction],
			},
		};
		// when
		render(<ActionBar {...props} />);
		const right = document.getElementsByClassName('navbar-right')[0];
		// then
		expect(within(right).getByText('Primary')).toBeInTheDocument();
		expect(within(right).getByText('Secondary')).toBeInTheDocument();
		expect(within(right).getByText('Add File')).toBeInTheDocument();
	});
	it('should render selected count and multi-selected actions, all on left', () => {
		// given
		const props = {
			selected: 1,
			actions: {},
			multiSelectActions: {
				left: [secondaryAction, splitAction],
			},
		};
		// when
		render(<ActionBar {...props} />);
		const left = document.getElementsByClassName('navbar-left')[0];
		// then
		expect(within(left).getByText('1 selected')).toBeInTheDocument();
		expect(within(left).getByText('Secondary')).toBeInTheDocument();
		expect(within(left).getByText('Add File')).toBeInTheDocument();
	});
	it(
		'should render selected count and multi-selected actions,' +
			' count and some actions on left, the other on right',
		() => {
			// given
			const props = {
				selected: 1,
				actions: {},
				multiSelectActions: {
					left: [primaryAction],
					right: [secondaryAction, splitAction],
				},
			};
			// when
			render(<ActionBar {...props} />);
			// then
			const left = document.getElementsByClassName('navbar-left')[0];
			const right = document.getElementsByClassName('navbar-right')[0];
			expect(within(left).getByText('1 selected')).toBeInTheDocument();
			expect(within(left).getByText('Primary')).toBeInTheDocument();
			expect(within(right).getByText('Secondary')).toBeInTheDocument();
			expect(within(right).getByText('Add File')).toBeInTheDocument();
		},
	);
	it('should render selected count and multi-selected actions, all on right', () => {
		// given
		const props = {
			selected: 1,
			actions: {},
			multiSelectActions: {
				right: [primaryAction, secondaryAction, splitAction],
			},
		};
		// when
		render(<ActionBar {...props} />);
		// then
		const right = document.getElementsByClassName('navbar-right')[0];
		expect(screen.getByText('1 selected')).toBeInTheDocument();
		expect(within(right).getByText('Primary')).toBeInTheDocument();
		expect(within(right).getByText('Secondary')).toBeInTheDocument();
		expect(within(right).getByText('Add File')).toBeInTheDocument();
	});
});
