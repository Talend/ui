import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionIconToggle from './ActionIconToggle.component';

jest.unmock('@talend/design-system');

const inactiveIconToggle = {
	className: 'my-icon-toggle',
	icon: 'talend-panel-opener-right',
	iconTransform: 'rotate-90',
	id: 'my-inactive-action',
	label: "Click me, I'm inactive",
	onClick: jest.fn(),
	tooltipPlacement: 'top',
	'data-feature': 'action.feature',
};

describe('ActionIconToggle', () => {
	it('should render a button', () => {
		// when
		render(<ActionIconToggle {...inactiveIconToggle} />);

		// then
		expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
	});

	it('should render an active button', () => {
		// when
		render(<ActionIconToggle {...inactiveIconToggle} active />);

		// then
		expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
		expect(screen.getByRole('button')).toHaveClass('active');
	});

	it('should call click callback', () => {
		// given
		render(<ActionIconToggle {...inactiveIconToggle} />);
		expect(inactiveIconToggle.onClick).not.toBeCalled();

		// when
		userEvent.click(screen.getByRole('button'));

		// then
		expect(inactiveIconToggle.onClick).toBeCalled();
	});
});
