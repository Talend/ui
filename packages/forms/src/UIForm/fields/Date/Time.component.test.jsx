import { act, fireEvent, render, screen } from '@testing-library/react';

import TimeWidget from './Time.component';

vi.unmock('@talend/design-system');

describe('Time component', () => {
	beforeEach(() => {
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
	});

	const schema = {
		autoFocus: true,
		description: 'talend time picker',
		required: true,
		title: 'Select Time',
		type: 'text',
	};
	const props = {
		id: 'myForm',
		errorMessage: 'My error message',
		onChange: vi.fn(),
		onFinish: vi.fn(),
		schema,
	};
	it('should render an InputTimePicker', () => {
		const { container } = render(<TimeWidget {...props} value="12:34" />);

		expect(container.firstChild).toMatchSnapshot();
	});
	it('should trigger onFinish on picker blur', async () => {
		// given
		vi.useFakeTimers();
		render(<TimeWidget {...props} value="12:00" />);
		const event = { target: {} };

		// when
		fireEvent.blur(screen.getByRole('textbox'), event);
		await act(async () => {
			vi.runAllTimers();
			vi.useRealTimers();
		});
		// then
		expect(props.onFinish).toHaveBeenCalled();
	});
	describe('onChange', () => {
		beforeEach(() => {
			vi.useFakeTimers();
			vi.resetAllMocks();
		});
		afterEach(async () => {
			await act(async () => {
				vi.runAllTimers();
			});
			vi.useRealTimers();
		});

		it('should call props onChange', async () => {
			// given
			render(<TimeWidget {...props} />);

			// when
			fireEvent.change(screen.getByRole('textbox'), { target: { value: '12:34' } });
			fireEvent.blur(screen.getByRole('textbox'));
			await act(async () => {
				vi.runAllTimers();
			});

			// then
			expect(props.onChange).toHaveBeenCalledWith(expect.anything(), { schema, value: '12:34' });
		});

		it('should call props onFinish when there is no error', async () => {
			// given
			render(<TimeWidget {...props} />);
			const event = { target: {} };
			const payload = {
				time: { hours: '12', minutes: '34' },
				textInput: '12:34',
				errorMessage: undefined,
			};

			// when
			fireEvent.change(screen.getByRole('textbox'), { target: { value: '12:34' } });
			fireEvent.blur(screen.getByRole('textbox'));
			await act(async () => {
				vi.runAllTimers();
			});

			// then
			expect(props.onFinish).toHaveBeenCalledWith(expect.anything(), { schema, value: '12:34' });
		});
		it('should NOT call props onFinish when there is an error', async () => {
			// given
			render(<TimeWidget {...props} />);
			const event = { target: {} };
			const payload = {
				time: null,
				textInput: '99:100',
				errorMessage: 'THERE IS AN ERROR',
			};

			// when
			fireEvent.change(screen.getByRole('textbox'), { target: { value: '99:100' } });

			await act(async () => {
				vi.runAllTimers();
			});

			// then
			expect(props.onChange).toHaveBeenCalled();
			expect(props.onFinish).not.toHaveBeenCalled();
		});
	});
});
