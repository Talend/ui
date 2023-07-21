import { fireEvent, render, screen } from '@testing-library/react';
import { BadgeOperatorPopover } from './BadgeOperatorPopover.component';

describe('BadgeOperatorPopover', () => {
	const operators = [
		{
			name: 'operatorIconEqual',
			label: 'My icon operator equal',
			iconName: 'my-icon-equal',
		},
		{
			name: 'operatorIconNotEqual',
			label: 'My icon operator not equal',
			iconName: 'my-icon-not-equal',
		},
	];
	it('should render the html output', () => {
		// Given
		const props = {
			id: 'my-id',
			operators,
			onClick: jest.fn(),
		};
		// When
		const { container } = render(<BadgeOperatorPopover {...props} />);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render a button with icon per operators', () => {
		// Given
		const props = {
			id: 'my-id',
			operators,
			onClick: jest.fn(),
		};
		// When
		render(<BadgeOperatorPopover {...props} />);
		// Then
		expect(document.querySelectorAll('button')[0]).toHaveAttribute(
			'aria-label',
			'My icon operator equal',
		);
		expect(document.querySelectorAll('svg')[0]).toHaveAttribute('name', 'talend-my-icon-equal');
		expect(document.querySelectorAll('button')[1]).toHaveAttribute(
			'aria-label',
			'My icon operator not equal',
		);
		expect(document.querySelectorAll('svg')[1]).toHaveAttribute('name', 'talend-my-icon-not-equal');
		expect(document.querySelectorAll('button')).toHaveLength(2);
		expect(document.querySelectorAll('svg')).toHaveLength(2);
	});
	it('should render a button with text as operator', () => {
		// Given
		const props = {
			id: 'my-id',
			operators: [
				{
					name: 'myTextOperator',
					label: 'Label',
				},
			],
			onClick: jest.fn(),
		};
		// When
		render(<BadgeOperatorPopover {...props} />);
		// Then
		expect(screen.getByLabelText('Label')).toBeVisible();
		expect(document.querySelectorAll('button')).toHaveLength(1);
	});
	it('should trigger on click', () => {
		// Given
		const onClick = jest.fn();
		const props = {
			id: 'my-id',
			operators,
			onClick,
		};
		// When
		render(<BadgeOperatorPopover {...props} />);
		fireEvent.click(document.querySelectorAll('button')[0]);
		// Then
		expect(onClick.mock.calls.length).toBe(1);
		expect(onClick.mock.calls[0][1]).toBe('operatorIconEqual');
	});
});
