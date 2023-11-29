import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NameFilter from './NameFilter.component';

describe('NameFilter component snaps', () => {
	it('should render', () => {
		const props = {
			onChange: () => {},
			label: 'Example label',
		};

		const { container } = render(<NameFilter {...props} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should reset the filter', async () => {
		const user = userEvent.setup();

		const onChange = jest.fn();
		const props = {
			onChange,
			label: 'Example label',
		};

		render(<NameFilter {...props} />);
		await user.click(screen.getByLabelText('Remove filter'));

		expect(onChange).toHaveBeenLastCalledWith({ target: { value: '' } });
	});
});
