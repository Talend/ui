import { shallow, mount } from 'enzyme';
import { act, render, screen, fireEvent } from '@testing-library/react';
import DateTimeWidget from './DateTime.component';

jest.mock('ally.js');
jest.unmock('@talend/design-system');

describe('DateTime widget', () => {
	beforeEach(() => {
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
	xit('should render an InputDateTimePicker', () => {
		// when
		const { container } = render(
			<DateTimeWidget
				id="talend-date-time"
				isValid={false}
				errorMessage="something wrong"
				schema={schema}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				options={{}}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
	xit('should convert iso-datetime for render', async () => {
		// given
		const isoSchema = {
			...schema,
			schema: { type: 'string', format: 'iso-datetime' },
		};
		const value = '2018-01-01T10:35:48.951Z';
		const onFinish = jest.fn();
		// when
		render(
			<DateTimeWidget
				id="myForm"
				isValid={false}
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={onFinish}
				options={{}}
				schema={isoSchema}
				useSeconds
				value={value}
			/>,
		);
		fireEvent.blur(screen.getAllByRole('textbox')[0]);
		await act(async () => {
			jest.runAllTimers();
		});
		// then
		expect(screen.getAllByRole('textbox')[0]).toHaveValue('2018-01-01');
		expect(screen.getAllByRole('textbox')[1]).toHaveValue('11:35');
	});
	xit('should trigger onFinish on picker blur', async () => {
		// given
		const onFinish = jest.fn();
		render(
			<DateTimeWidget
				id="myForm"
				isValid={false}
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={onFinish}
				options={{}}
				schema={schema}
				value="15/02/2018"
			/>,
		);
		const event = { target: {} };

		// when
		fireEvent.blur(screen.getAllByRole('textbox')[0], event);
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
				<DateTimeWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dateFormat: 'DD/MM/YYYY' }}
					schema={schema}
				/>,
			);
			const event = { target: { value: '2015-09-21 00:00' } };

			// when
			fireEvent.change(screen.getAllByRole('textbox')[0], event);
			// fireEvent.change(screen.getAllByRole('textbox')[1], event);
			await act(async () => {
				jest.runAllTimers();
			});

			// then
			expect(onChange).toBeCalledWith(expect.anything(event), { schema, value: '2015-09-21' });
		});

		xit('should convert valid date to timestamp', async () => {
			// given
			const onChange = jest.fn();
			const timestampSchema = {
				...schema,
				schema: { type: 'number' },
			};
			render(
				<DateTimeWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dateFormat: 'DD/MM/YYYY' }}
					schema={timestampSchema}
					useSeconds
				/>,
			);
			const event = { target: {} };
			const payload = {
				datetime: new Date(2015, 9, 21, 2, 30, 9),
				textInput: '2015-09-21 02:30:09',
				errorMessage: undefined,
			};

			// when
			fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '21/09/2015' } });
			fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: '02:30' } });
			await act(async () => {
				jest.runAllTimers();
			});

			// then
			expect(onChange.mock.calls[1][1]).toMatchObject({
				schema: timestampSchema,
				value: payload.datetime.getTime(),
			});
		});

		xit('should not throw any error message', () => {
			// given
			const onChange = jest.fn();
			const timestampSchema = {
				...schema,
				schema: { type: 'number' },
			};
			const wrapper = shallow(
				<DateTimeWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					options={{}}
					schema={timestampSchema}
				/>,
			);
			expect(onChange).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				datetime: undefined,
				textInput: '',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDateTimePickerSwitch').simulate('change', event, payload);

			// then
			expect(onChange).toBeCalledWith(event, {
				schema: timestampSchema,
				value: undefined,
			});
		});

		xit('should convert valid date to ise-datetime', () => {
			// given
			const onChange = jest.fn();
			const isoSchema = {
				...schema,
				schema: { format: 'iso-datetime' },
			};
			const wrapper = mount(
				<DateTimeWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					options={{}}
					schema={isoSchema}
				/>,
			);
			expect(onChange).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				datetime: new Date(2015, 9, 21, 2, 30),
				textInput: '2015-09-21 02:30',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDateTimePicker').prop('onChange')(event, payload);

			// then
			expect(onChange).toBeCalledWith(event, {
				schema: isoSchema,
				value: payload.datetime.toISOString(),
			});
		});

		xit('should call props onFinish when there is no error', () => {
			// given
			const onFinish = jest.fn();
			const wrapper = mount(
				<DateTimeWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={jest.fn()}
					onFinish={onFinish}
					options={{}}
					schema={schema}
					value="15/02/2018"
				/>,
			);
			expect(onFinish).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				datetime: new Date(2015, 9, 21, 2, 30, 9),
				textInput: '2015-09-21 02:30',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDateTimePicker').prop('onChange')(event, payload);

			// then
			expect(onFinish).toBeCalledWith(event, { schema, value: '2015-09-21 02:30' });
		});

		xit('should NOT call props onFinish when there is an error', () => {
			// given
			const onFinish = jest.fn();
			const wrapper = mount(
				<DateTimeWidget
					id="myForm"
					isValid={false}
					errorMessage="My error message"
					onChange={jest.fn()}
					onFinish={onFinish}
					options={{}}
					schema={schema}
					value="15/02/2018"
				/>,
			);
			expect(onFinish).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				datetime: new Date(''), // invalid error
				textInput: '2015-09-aa',
				errorMessage: 'THERE IS AN ERROR',
			};

			// when
			wrapper.find('InputDateTimePicker').prop('onChange')(event, payload);

			// then
			expect(onFinish).not.toBeCalled();
		});
	});
});
