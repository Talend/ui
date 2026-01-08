import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputTimePicker from './InputTimePicker.component';

jest.unmock('@talend/design-system');

describe('InputTimePicker', () => {
	describe('focus/blur', () => {
		it('should open picker on focus', async () => {
			const user = userEvent.setup();

			// given
			render(<InputTimePicker id="my-picker" />);
			expect(screen.queryAllByRole('listitem').length).toBe(0);

			// when
			await user.click(screen.getByRole('textbox'));
			const items = screen.queryAllByRole('listitem');
			expect(items.length).toBe(24);
			await user.click(items[0]);
			expect(screen.getByRole('textbox')).toHaveValue(items[0].textContent);
		});
		it('should not open picker on focus when disabled', async () => {
			const user = userEvent.setup();

			// given
			render(<InputTimePicker disabled id="my-picker" />);

			// when
			await user.click(screen.getByRole('textbox'));

			// then
			const items = screen.queryAllByRole('listitem');
			expect(items.length).toBe(0);
		});
		it('should close picker on blur', async () => {
			const user = userEvent.setup();

			// given
			render(<InputTimePicker id="my-picker" />);
			await user.click(screen.getByRole('textbox'));

			// when
			await user.keyboard('{Escape}');

			// then
			const items = screen.queryAllByRole('listitem');
			expect(items.length).toBe(0);
		});
	});
	describe('on change', () => {
		it('should trigger props.onChange', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<InputTimePicker id="my-picker" onChange={onChange} />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			await user.click(screen.getByRole('textbox'));
			await user.keyboard('15:45');
			await user.click(screen.getByText('HH:mm'));

			// then
			expect(onChange).toHaveBeenCalledWith(expect.anything(), {
				time: { hours: '15', minutes: '45', seconds: '00' },
				origin: 'INPUT',
				textInput: '15:45',
				errors: [],
				errorMessage: null,
			});
		});

		it('should close overlay', async () => {
			const user = userEvent.setup();

			// given
			render(<InputTimePicker id="my-picker" onChange={jest.fn()} />);
			await user.click(screen.getByRole('textbox'));

			// when
			await user.click(screen.queryAllByRole('listitem')[0]);

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(0);
		});

		it('should NOT close from input change', async () => {
			const user = userEvent.setup();

			// given
			render(<InputTimePicker id="my-picker" onChange={jest.fn()} />);
			await user.click(screen.getByRole('textbox'));

			// when
			await user.keyboard('15');

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(24);
		});
	});
	describe('keydown', () => {
		it('should close the picker and focus on input with ESC', async () => {
			const user = userEvent.setup();

			// given
			render(<InputTimePicker id="my-picker" />);
			await user.click(screen.getByRole('textbox'));

			// when
			await user.keyboard('{Escape}');

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(0);
		});

		it('should open picker if it is closed with DOWN on input', async () => {
			const user = userEvent.setup();

			// given
			render(<InputTimePicker id="my-picker" />);
			await user.click(screen.getByRole('textbox'));
			await user.keyboard('{Escape}');
			expect(screen.queryAllByRole('listitem').length).toBe(0);

			// when
			await user.keyboard('{ArrowDown}');

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(24);
		});

		it('should focus on time option if it is open with input DOWN', async () => {
			const user = userEvent.setup();

			// given
			render(<InputTimePicker id="my-picker" />, { attachTo: document.body });
			await user.click(screen.getByRole('textbox'));

			// when
			await user.keyboard('{ArrowDown}');

			// then
			expect(screen.getAllByRole('listitem')[0]).toHaveFocus();
			expect(screen.getAllByRole('listitem')[0]).toHaveClass('tc-time-picker-time');
		});
	});
});
