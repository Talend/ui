import { act, fireEvent, render, screen } from '@testing-library/react';

import DateTimeWidget from './DateTime.component';

jest.unmock('@talend/design-system');

describe('DateTime widget', () => {
	beforeEach(() => {
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.useRealTimers();
	});

	const schema = {
		autoFocus: true,
		description: 'talend datetime picker',
		placeholder: 'YYYY-MM-DD HH:mm',
		required: true,
		title: 'Select DateTime',
		type: 'text',
		schema: { type: 'string' },
	};
	const props = {
		schema,
		id: 'talend-date-time',
		errorMessage: 'something wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		options: {},
	};
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it('should render an InputDateTimePicker', () => {
		// when
		const { container } = render(<DateTimeWidget {...props} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should convert iso-datetime for render', async () => {
		// given
		const isoSchema = {
			...schema,
			schema: { type: 'string', format: 'iso-datetime' },
		};
		const value = '2018-01-01T10:35:48.951Z';
		// when
		render(<DateTimeWidget {...props} schema={isoSchema} value={value} />);
		fireEvent.blur(screen.getAllByRole('textbox')[0]);
		await act(async () => {
			jest.runAllTimers();
		});
		// then
		expect(screen.getAllByRole('textbox')[0]).toHaveValue('2018-01-01');
		expect(screen.getAllByRole('textbox')[1]).toHaveValue('10:35');
	});
	it('should trigger onFinish on picker blur', async () => {
		// given
		render(<DateTimeWidget {...props} value="15/02/2018" />);
		const event = { target: {} };

		// when
		fireEvent.blur(screen.getAllByRole('textbox')[0], event);
		await act(async () => {
			jest.runAllTimers();
		});

		// then
		expect(props.onFinish).toHaveBeenCalled();
	});
	describe('onChange', () => {
		it('should call props onChange', async () => {
			// given
			render(<DateTimeWidget {...props} options={{ dateFormat: 'DD/MM/YYYY' }} />);

			// when
			fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '21/09/2015' } });
			fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: '09:10' } });
			fireEvent.blur(screen.getAllByRole('textbox')[1]);

			await act(async () => {
				jest.runAllTimers();
			});

			// then
			expect(props.onChange).toHaveBeenCalledTimes(2);
			expect(props.onChange.mock.calls[1][1]).toMatchObject({
				schema,
				value: '21/09/2015 09:10',
			});
		});

		it('should convert valid date to timestamp', async () => {
			// given
			const timestampSchema = {
				...schema,
				schema: { type: 'number' },
			};
			render(
				<DateTimeWidget
					{...props}
					options={{ dateFormat: 'DD/MM/YYYY', timezone: 'Europe/Paris' }}
					schema={timestampSchema}
				/>,
			);

			// when
			expect(screen.getAllByRole('textbox')).toHaveLength(2);
			fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '21/09/2015' } });
			fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: '02:30' } });
			fireEvent.blur(screen.getAllByRole('textbox')[1]);

			await act(async () => {
				jest.runAllTimers();
			});

			// then
			expect(props.onChange).toHaveBeenCalledTimes(2);

			expect(props.onChange.mock.calls[1][1]).toMatchObject({
				schema: timestampSchema,
				value: new Date(2015, 8, 21, 1, 30, 0).getTime(),
			});
		});

		it('should not throw any error message', async () => {
			// given
			const timestampSchema = {
				...schema,
				schema: { type: 'number' },
			};
			render(<DateTimeWidget {...props} schema={timestampSchema} />);

			// when
			fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '' } });
			fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: '' } });
			fireEvent.blur(screen.getAllByRole('textbox')[1]);

			await act(async () => {
				jest.runAllTimers();
			});

			// then
			expect(props.onChange).not.toHaveBeenCalledWith();
		});

		it('should convert valid date to iso-datetime', async () => {
			// given
			const onChange = jest.fn();
			const isoSchema = {
				...schema,
				schema: { format: 'iso-datetime' },
			};
			render(<DateTimeWidget {...props} schema={isoSchema} />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '2015-09-21' } });
			fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: '02:30' } });
			fireEvent.blur(screen.getAllByRole('textbox')[1]);

			await act(async () => {
				jest.runAllTimers();
			});

			// then
			expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
				schema: isoSchema,
				value: new Date(2015, 8, 21, 2, 30).toISOString(),
			});
		});

		it('should call props onFinish when there is no error', async () => {
			// given
			render(<DateTimeWidget {...props} value="2018-15-02" />);

			// when
			fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '2015-09-21' } });
			fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: '02:30' } });
			fireEvent.blur(screen.getAllByRole('textbox')[1]);
			await act(async () => {
				jest.runAllTimers();
			});

			// then
			expect(props.onFinish).toHaveBeenCalledWith(expect.anything(), {
				schema,
				value: '2015-09-21 02:30',
			});
		});

		it('should call props onFinish when there is an error without value', async () => {
			// given
			render(<DateTimeWidget {...props} value="2018-02-15" />);

			// when
			fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '2015-09-aa' } });
			fireEvent.blur(screen.getAllByRole('textbox')[0]);
			await act(async () => {
				jest.runAllTimers();
			});

			// then
			expect(props.onFinish).toHaveBeenCalledWith(expect.anything(), {
				schema,
				value: undefined,
			});
		});
	});
});
