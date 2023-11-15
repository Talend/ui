import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputTimePicker from './InputTimePicker.component';

jest.unmock('@talend/design-system');

describe('InputTimePicker', () => {
	describe('focus/blur', () => {
		it('should open picker on focus', async () => {
			// given
			render(<InputTimePicker id="my-picker" />);
			expect(screen.queryAllByRole('listitem').length).toBe(0);

			// when
			await userEvent.click(screen.getByRole('textbox'));
			const items = screen.queryAllByRole('listitem');
			expect(items.length).toBe(24);
			await userEvent.click(items[0]);
			expect(screen.getByRole('textbox')).toHaveValue(items[0].textContent);
		});
		it('should not open picker on focus when disabled', async () => {
			// given
			render(<InputTimePicker disabled id="my-picker" />);

			// when
			await userEvent.click(screen.getByRole('textbox'));

			// then
			const items = screen.queryAllByRole('listitem');
			expect(items.length).toBe(0);
		});
		it('should close picker on blur', async () => {
			// given
			render(<InputTimePicker id="my-picker" />);
			await userEvent.click(screen.getByRole('textbox'));

			// when
			await userEvent.keyboard('{Escape}');

			// then
			const items = screen.queryAllByRole('listitem');
			expect(items.length).toBe(0);
		});
	});
	describe('on change', () => {
		it('should trigger props.onChange', async () => {
			// given
			const onChange = jest.fn();
			render(<InputTimePicker id="my-picker" onChange={onChange} />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			await userEvent.click(screen.getByRole('textbox'));
			await userEvent.keyboard('15:45');
			await userEvent.click(screen.getByText('HH:mm'));

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
			// given
			render(<InputTimePicker id="my-picker" onChange={jest.fn()} />);
			await userEvent.click(screen.getByRole('textbox'));

			// when
			await userEvent.click(screen.queryAllByRole('listitem')[0]);

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(0);
		});

		it('should NOT close from input change', async () => {
			// given
			render(<InputTimePicker id="my-picker" onChange={jest.fn()} />);
			await userEvent.click(screen.getByRole('textbox'));

			// when
			await userEvent.keyboard('15');

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(24);
		});
	});
	describe('keydown', () => {
		it('should close the picker and focus on input with ESC', async () => {
			// given
			render(<InputTimePicker id="my-picker" />);
			await userEvent.click(screen.getByRole('textbox'));

			// when
			await userEvent.keyboard('{Escape}');

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(0);
		});

		it('should open picker if it is closed with DOWN on input', async () => {
			// given
			render(<InputTimePicker id="my-picker" />);
			await userEvent.click(screen.getByRole('textbox'));
			await userEvent.keyboard('{Escape}');
			expect(screen.queryAllByRole('listitem').length).toBe(0);

			// when
			await userEvent.keyboard('{ArrowDown}');

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(24);
		});

		it('should focus on time option if it is open with input DOWN', async () => {
			// given
			render(<InputTimePicker id="my-picker" />, { attachTo: document.body });
			await userEvent.click(screen.getByRole('textbox'));

			// when
			await userEvent.keyboard('{ArrowDown}');

			// then
			expect(screen.getAllByRole('listitem')[0]).toHaveFocus();
			expect(screen.getAllByRole('listitem')[0]).toHaveClass('tc-time-picker-time');
		});
	});
});
