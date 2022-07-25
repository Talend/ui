import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import { WithMenus } from './HeaderCellRenderer.component.stories';

describe('HeaderCellRenderer', () => {
	it('should open menu', () => {
		render(<WithMenus />);
		fireEvent.click(screen.getAllByRole('button')[1]);
		expect(screen.getByText('MY MENU')).toBeVisible();
	});
});
