// rewrite using rtl
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDateTimePicker from './InputDateTimePicker.component';

function getPopup() {
	return document.querySelector('.theme-popper');
}

describe('InputDateTimePicker', () => {
	describe('focus/blur', () => {
		it('should open picker on focus', async () => {
			const user = userEvent.setup();

			// given
			render(<InputDateTimePicker id="my-picker" />);
			expect(screen.getByRole('textbox')).toBeVisible();
			expect(getPopup()).not.toBeInTheDocument();

			// when
			await user.click(screen.getByRole('textbox'));

			// then
			expect(screen.getByRole('textbox')).toHaveFocus();
			expect(getPopup()).toBeInTheDocument();
		});

		it('should close picker on blur', async () => {
			const user = userEvent.setup();

			// given
			render(<InputDateTimePicker id="my-picker" />);
			await user.click(screen.getByRole('textbox'));

			// when
			screen.getByRole('textbox').blur();

			// then
			await waitFor(() => expect(getPopup()).not.toBeInTheDocument());
		});

		it('should trigger props.onBlur', async () => {
			const user = userEvent.setup();

			// given
			const onBlur = jest.fn();
			render(<InputDateTimePicker id="my-picker" onBlur={onBlur} />);
			await user.click(screen.getByRole('textbox'));
			expect(onBlur).not.toHaveBeenCalled();

			// when
			screen.getByRole('textbox').blur();

			// then
			await waitFor(() => expect(onBlur).toHaveBeenCalled());
		});
	});

	describe('keydown', () => {
		it('should close the picker and focus on input with ESC', async () => {
			const user = userEvent.setup();

			// given
			render(<InputDateTimePicker id="my-picker" />);
			await user.click(screen.getByRole('textbox'));

			// when
			await user.keyboard('{Escape}');

			// then
			await waitFor(() => expect(getPopup()).toBeNull());
		});

		it('should open picker if it is closed with DOWN on input', async () => {
			const user = userEvent.setup();

			// given
			render(<InputDateTimePicker id="my-picker" />);

			// when
			await user.click(screen.getByRole('textbox'));
			await user.keyboard('{Escape}');
			await user.keyboard('{ArrowDown}');

			// then
			expect(getPopup()).not.toBeNull();
		});

		it('should focus on calendar day if it is open with input DOWN', async () => {
			const user = userEvent.setup();

			// given
			render(<InputDateTimePicker id="my-picker" />);
			await user.click(screen.getByRole('textbox'));

			// when
			await user.keyboard('{ArrowDown}'); //open

			// then
			await waitFor(() => expect(document.activeElement).toHaveClass('tc-date-picker-day'));
		});
	});

	describe('onChange', () => {
		it('should trigger props.onChange', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			const payload = {
				datetime: new Date(2015, 0, 15, 15, 45),
				origin: 'INPUT',
				textInput: '2015-01-15 15:45',
				errors: [],
				errorMessage: null,
			};
			render(<InputDateTimePicker id="my-picker" onChange={onChange} useTime />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			await user.click(screen.getByRole('textbox'));
			await user.keyboard('2015-01-15 15:45');
			// blur
			await user.keyboard('{Enter}');

			// then
			expect(onChange).toHaveBeenCalledWith(expect.anything(), payload);
		});

		test.each([
			{
				name: 'should NOT close overlay in form mode',
				expectedOverlay: true,
				formMode: true,
				useTime: false,
			},
			{
				name: 'should NOT close overlay in time mode',
				expectedOverlay: true,
				formMode: false,
				useTime: true,
			},
		])('$name', async ({ expectedOverlay, formMode, useTime }) => {
			const user = userEvent.setup();

			// given
			render(
				<InputDateTimePicker
					id="my-picker"
					onChange={jest.fn()}
					formMode={formMode}
					useTime={useTime}
				/>,
			);
			// when
			await user.click(screen.getByRole('textbox'));

			// then
			expect(getPopup() !== null).toBe(expectedOverlay);
		});
	});
});
