import { act, render, screen, fireEvent } from '@testing-library/react';
import DateWidget from './Date.component';

jest.unmock('@talend/design-system');

describe('Date widget', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.runAllTimers();
		jest.useRealTimers();
	});

	const schema = {
		autoFocus: true,
		description: 'my date picker',
		placeholder: 'Type your date here',
		required: true,
		title: 'My date title',
		type: 'text',
		schema: { type: 'string' },
	};

	it('should render date picker', async () => {
		// when
		jest.useFakeTimers().setSystemTime(new Date('2018-02-15T23:55:32'));
		const { container } = render(
			<DateWidget
				id="myForm"
				isValid={false}
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				options={{ dateFormat: 'DD/MM/YYYY' }}
				schema={schema}
				value="15/02/2018 23:55:32"
			/>,
		);

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
		render(
			<DateWidget
				id="myForm"
				isValid={false}
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				options={{ dateFormat: 'DD/MM/YYYY' }}
				schema={isoSchema}
				useTime
				useSeconds
				value={value}
			/>,
		);

		// then
		expect(screen.getByRole('textbox')).toHaveValue('01/01/2018');
	});

	it('should trigger onFinish on picker blur', async () => {
		// given
		jest.useFakeTimers();
		const onFinish = jest.fn();
		render(
			<DateWidget
				id="myForm"
				isValid={false}
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={onFinish}
				options={{ dateFormat: 'DD/MM/YYYY' }}
				schema={schema}
				value="15/02/2018"
			/>,
		);
		expect(onFinish).not.toBeCalled();

		// when
		fireEvent.click(screen.getByRole('textbox'));
		fireEvent.blur(screen.getByRole('textbox'));
		await act(async () => {
			jest.runAllTimers();
		});

		// then
		expect(onFinish).toBeCalled();
	});

	describe('onChange', () => {
		it('should call props onChange', async () => {
			// given
			const onChange = jest.fn();
			render(
				<DateWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dateFormat: 'DD/MM/YYYY' }}
					schema={schema}
					value="15/02/2018"
				/>,
			);
			expect(onChange).not.toBeCalled();
			const event = { target: { value: '21/09/2015' } };

			// when
			fireEvent.change(screen.getByRole('textbox'), event);

			// then
			await act(async () => {
				jest.runAllTimers();
			});

			expect(onChange).toBeCalledWith(expect.anything(event), { schema, value: '21/09/2015' });
		});

		it('should convert valid date to timestamp', async () => {
			// given
			const onChange = jest.fn();
			const timestampSchema = {
				...schema,
				schema: { type: 'number' },
			};
			render(
				<DateWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dateFormat: 'DD/MM/YYYY' }}
					schema={timestampSchema}
				/>,
			);
			const event = { target: { value: '21/09/2015' } };

			// when
			fireEvent.change(screen.getByRole('textbox'), event);

			await act(async () => {
				jest.runAllTimers();
			});
			// then
			expect(onChange).toBeCalledWith(expect.anything(event), {
				schema: timestampSchema,
				value: 1442786400000,
			});
		});

		it('should not throw any error message', async () => {
			// given
			const onChange = jest.fn();
			const timestampSchema = {
				...schema,
				schema: { type: 'number' },
			};
			render(
				<DateWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dateFormat: 'DD/MM/YYYY' }}
					schema={timestampSchema}
				/>,
			);
			const event = { target: { value: 123 } };

			// when
			fireEvent.change(screen.getByRole('textbox'), event);

			await act(async () => {
				jest.runAllTimers();
			});
			// then
			expect(onChange).toBeCalledWith(
				expect.anything(event),
				expect.anything({
					schema: timestampSchema,
					value: new Date(NaN),
				}),
			);
		});

		it('should convert valid date to ise-datetime', async () => {
			// given
			const onChange = jest.fn();
			const isoSchema = {
				...schema,
				schema: { format: 'iso-datetime' },
			};
			render(
				<DateWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dateFormat: 'DD/MM/YYYY' }}
					schema={isoSchema}
				/>,
			);
			const event = { target: { value: '21/09/2015' } };

			// when
			fireEvent.change(screen.getByRole('textbox'), event);

			await act(async () => {
				jest.runAllTimers();
			});
			// then
			expect(onChange).toBeCalledWith(expect.anything(event), {
				schema: isoSchema,
				value: '2015-09-20T22:00:00.000Z',
			});
		});

		it('should call props onFinish when there is no error', async () => {
			// given
			const onFinish = jest.fn();
			render(
				<DateWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={jest.fn()}
					onFinish={onFinish}
					options={{ dateFormat: 'DD/MM/YYYY' }}
					schema={schema}
					value="15/02/2018"
				/>,
			);
			const event = { target: { value: '21/09/2015' } };

			// when
			fireEvent.change(screen.getByRole('textbox'), event);

			await act(async () => {
				jest.runAllTimers();
			});
			// then
			expect(onFinish).toBeCalledWith(expect.anything(event), { schema, value: '21/09/2015' });
		});

		it('should NOT call props onFinish when there is an error', async () => {
			// given
			const onFinish = jest.fn();
			render(
				<DateWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={jest.fn()}
					onFinish={onFinish}
					options={{ dateFormat: 'DD/MM/YYYY' }}
					schema={schema}
					value="15/02/2018"
				/>,
			);
			expect(onFinish).not.toBeCalled();
			const event = { target: { value: '2015-09-aa' } };

			// when
			fireEvent.change(screen.getByRole('textbox'), event);

			await act(async () => {
				jest.runAllTimers();
			});
			// then
			expect(onFinish).not.toBeCalled();
		});
	});
});
