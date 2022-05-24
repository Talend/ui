import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import DefaultPinHeaderRenderer from './PinHeaderRenderer.component';

describe('PinHeader', () => {
	it('should render', () => {
		const onClick = jest.fn();
		render(<DefaultPinHeaderRenderer onClick={onClick}>My menu</DefaultPinHeaderRenderer>);

		fireEvent.mouseEnter(screen.getByRole('button'));
		expect(screen.getByRole('tooltip')).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button'));
		expect(onClick).toHaveBeenCalled();
	});
});
