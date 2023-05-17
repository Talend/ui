import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabelToggle from './LabelToggle.component';

describe('LabelToggle', () => {
	let onChange;
	let props;
	beforeEach(() => {
		onChange = jest.fn();
		props = {
			values: [
				{ label: 'A', value: 'a' },
				{ label: 'B', value: 'b' },
				{ label: 'C', value: 'c' },
			],
			id: 'test',
			name: 'name',
			value: 'b',
			onChange,
		};
	});

	it('should render three radio buttons', () => {
		const { container } = render(<LabelToggle {...props} />);
		expect(screen.getAllByRole('radio')).toHaveLength(3);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should be checked the "checked" value', () => {
		render(<LabelToggle {...props} />);
		expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
		expect(onChange).toHaveBeenCalledTimes(0);
	});
	it('should change the default value', () => {
		render(<LabelToggle {...props} />);
		userEvent.click(screen.getByRole('radio', { name: 'A' }));
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith('a');
	});
});
