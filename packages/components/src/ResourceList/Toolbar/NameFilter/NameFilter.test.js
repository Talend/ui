import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NameFilter from './NameFilter.component';

describe('NameFilter', () => {
	it('should trigger onChange callback on change', async () => {
		const user = userEvent.setup();

		const onChange = jest.fn();
		const payload = {
			target: {
				value: 'titi',
			},
		};

		render(<NameFilter label="label" onChange={onChange} />);
		expect(onChange).not.toHaveBeenCalled();

		await user.click(screen.getByRole('textbox'));
		await user.keyboard('titi');

		await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.anything(payload)));
	});
});
