// rewrite using rtl
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDateTimePicker from './InputDateTimePicker.component';

function getPopup() {
	return document.querySelector('.theme-popper');
}

describe('InputDateTimePicker', () => {
	describe('focus/blur', () => {
		it('should open picker on focus', async () => {
			// given
			render(<InputDateTimePicker id="my-picker" />);
			expect(screen.getByRole('textbox')).toBeVisible();
			expect(getPopup()).not.toBeInTheDocument();

			// when
			await userEvent.click(screen.getByRole('textbox'));

			// then
			expect(screen.getByRole('textbox')).toHaveFocus();
			expect(getPopup()).toBeInTheDocument();
		});

		it('should close picker on blur', async () => {
			// given
			jest.useFakeTimers();
			render(<InputDateTimePicker id="my-picker" />);
			await userEvent.click(screen.getByRole('textbox'));

			// when
			screen.getByRole('textbox').blur();
			jest.runAllTimers();

			// then
			expect(getPopup()).not.toBeInTheDocument();
		});

		it('should trigger props.onBlur', async () => {
			// given
			jest.useFakeTimers();
			const onBlur = jest.fn();
			render(<InputDateTimePicker id="my-picker" onBlur={onBlur} />);
			await userEvent.click(screen.getByRole('textbox'));
			expect(onBlur).not.toBeCalled();

			// when
			screen.getByRole('textbox').blur();
			jest.runAllTimers();

			// then
			expect(onBlur).toBeCalled();
		});
	});

	describe('keydown', () => {
		it('should close the picker and focus on input with ESC', async () => {
			// given
			render(<InputDateTimePicker id="my-picker" />);
			await userEvent.click(screen.getByRole('textbox'));

			// when
			await userEvent.keyboard('{Escape}');

			// then
			expect(getPopup()).toBeNull();
		});

		it('should open picker if it is closed with DOWN on input', async () => {
			// given
			render(<InputDateTimePicker id="my-picker" />);

			// when
			await userEvent.click(screen.getByRole('textbox'));
			await userEvent.keyboard('{Escape}');
			await userEvent.keyboard('{ArrowDown}');

			// then
			expect(getPopup()).not.toBeNull();
		});

		it('should focus on calendar day if it is open with input DOWN', async () => {
			// given
			jest.useFakeTimers();
			render(<InputDateTimePicker id="my-picker" />);
			await userEvent.click(screen.getByRole('textbox'));

			// when
			await userEvent.keyboard('{ArrowDown}'); //open
			jest.runAllTimers();

			// then
			expect(document.activeElement).toHaveClass('tc-date-picker-day');
		});
	});

	describe('onChange', () => {
		it('should trigger props.onChange', async () => {
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
			expect(onChange).not.toBeCalled();

			// when
			await userEvent.click(screen.getByRole('textbox'));
			await userEvent.keyboard('2015-01-15 15:45');
			// blur
			await userEvent.keyboard('{Enter}');

			// then
			expect(onChange).toBeCalledWith(expect.anything(), payload);
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
			await userEvent.click(screen.getByRole('textbox'));

			// then
			expect(getPopup() !== null).toBe(expectedOverlay);
		});
	});
});
