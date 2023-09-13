import { render, screen } from '@testing-library/react';

import SelectAll from './SelectAll.component';

jest.unmock('@talend/design-system');

const props = {
	id: 'select-all',
	items: [{ id: 1 }, { id: 2 }],
	isSelected: jest.fn(),
	onToggleAll: jest.fn(),
};

describe('SelectAll', () => {
	it('should render', () => {
		render(<SelectAll {...props} />);
		expect(screen.getByTestId('select-all')).toBeInTheDocument();
	});

	it('should be checked when there isSelected prop is passed', () => {
		const isSelected = () => {
			return true;
		};

		render(<SelectAll {...props} isSelected={isSelected} />);
		expect(screen.getByRole('checkbox')).toBeChecked();
	});

	it('should be unchecked when there is no items', () => {
		render(<SelectAll {...props} items={[]} />);
		expect(screen.getByRole('checkbox')).not.toBeChecked();
	});
});
