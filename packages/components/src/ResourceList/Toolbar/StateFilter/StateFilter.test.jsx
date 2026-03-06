import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import StateFilter, { TYPES } from './StateFilter.component';

describe('StateFilter', () => {
	it('should render', () => {
		const props = {
			favorites: false,
			certified: false,
			onChange: () => {},
			types: [TYPES.CERTIFIED, TYPES.FAVORITES],
		};

		const { container } = render(<StateFilter {...props} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render with states to set to true', () => {
		const props = {
			favorites: true,
			certified: true,
			onChange: () => {},
			types: [TYPES.CERTIFIED, TYPES.FAVORITES],
		};

		render(<StateFilter {...props} />);
		expect(screen.getByLabelText('Certified')).toHaveAttribute('aria-pressed', 'true');
		expect(screen.getByLabelText('Favorites')).toHaveAttribute('aria-pressed', 'true');
	});

	it('should render with only favorites', () => {
		const props = {
			favorites: false,
			onChange: () => {},
			types: [TYPES.FAVORITES],
		};

		render(<StateFilter {...props} />);
		expect(screen.getByLabelText('Favorites')).toHaveAttribute('aria-pressed', 'false');
		expect(screen.queryByLabelText('Certified')).not.toBeInTheDocument();
	});

	it('should render with only certified', () => {
		const props = {
			certified: false,
			onChange: () => {},
			types: [TYPES.CERTIFIED],
		};

		render(<StateFilter {...props} />);
		expect(screen.getByLabelText('Certified')).toHaveAttribute('aria-pressed', 'false');
		expect(screen.queryByLabelText('Favorites')).not.toBeInTheDocument();
	});
	it('should trigger onChange callback with the new state on click', async () => {
		const user = userEvent.setup();

		const onChange = jest.fn();
		render(
			<StateFilter onChange={onChange} types={[TYPES.FAVORITES, TYPES.CERTIFIED]} certified />,
		);
		expect(onChange).not.toHaveBeenCalled();

		await user.click(screen.getByLabelText('Certified'));
		expect(onChange).toHaveBeenCalledWith(TYPES.CERTIFIED, false);

		await user.click(screen.getByLabelText('Favorites'));
		expect(onChange).toHaveBeenCalledWith(TYPES.FAVORITES, true);
	});
});
