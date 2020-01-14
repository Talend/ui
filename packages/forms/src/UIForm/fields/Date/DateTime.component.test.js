import React from 'react';
import { shallow, mount } from 'enzyme';

import DateTimeWidget from './DateTime.component';

describe('DateTime widget', () => {
	const schema = {
		autoFocus: true,
		description: 'talend datetime picker',
		placeholder: 'YYYY-MM-DD HH:mm',
		required: true,
		title: 'Select DateTime',
		type: 'text',
		schema: { type: 'string' },
	};
	it('should render an InputDateTimePicker', () => {
		// when
		const wrapper = shallow(
			<DateTimeWidget
				id="talend-date-time"
				isValid={false}
				errorMessage="something wrong"
				schema={schema}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				options={{ dafeFormat: 'DD/MM/YYYY' }}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should convert iso-datetime for render', () => {
		// given
		const isoSchema = {
			...schema,
			schema: { type: 'string', format: 'iso-datetime' },
		};
		const value = '2018-01-01T10:35:48.951Z';

		// when
		const wrapper = mount(
			<DateTimeWidget
				id={'myForm'}
				isValid={false}
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				options={{ dafeFormat: 'DD/MM/YYYY' }}
				schema={isoSchema}
				useSeconds
				value={value}
			/>,
		);

		// then
		expect(wrapper.find('InputDateTimePicker').prop('value')).toEqual(new Date(value));
	});
	it('should trigger onFinish on picker blur', () => {
		// given
		const onFinish = jest.fn();
		const wrapper = mount(
			<DateTimeWidget
				id={'myForm'}
				isValid={false}
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={onFinish}
				options={{ dafeFormat: 'DD/MM/YYYY' }}
				schema={schema}
				value={'15/02/2018'}
			/>,
		);
		expect(onFinish).not.toBeCalled();
		const event = { target: {} };

		// when
		wrapper.find('InputDateTimePicker').prop('onBlur')(event);

		// then
		expect(onFinish).toBeCalled();
	});
	describe('onChange', () => {
		it('should call props onChange', () => {
			// given
			const onChange = jest.fn();
			const wrapper = mount(
				<DateTimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dafeFormat: 'DD/MM/YYYY' }}
					schema={schema}
				/>,
			);
			expect(onChange).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				datetime: new Date(2015, 8, 21),
				textInput: '2015-09-21',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDateTimePicker').prop('onChange')(event, payload);

			// then
			expect(onChange).toBeCalledWith(event, { schema, value: '2015-09-21' });
		});

		it('should convert valid date to timestamp', () => {
			// given
			const onChange = jest.fn();
			const timestampSchema = {
				...schema,
				schema: { type: 'number' },
			};
			const wrapper = mount(
				<DateTimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dafeFormat: 'DD/MM/YYYY' }}
					schema={timestampSchema}
					useSeconds
				/>,
			);
			expect(onChange).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				datetime: new Date(2015, 9, 21, 2, 30, 9),
				textInput: '2015-09-21 02:30:09',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDateTimePicker').prop('onChange')(event, payload);

			// then
			expect(onChange).toBeCalledWith(event, {
				schema: timestampSchema,
				value: payload.datetime.getTime(),
			});
		});

		it('should not throw any error message', () => {
			// given
			const onChange = jest.fn();
			const timestampSchema = {
				...schema,
				schema: { type: 'number' },
			};
			const wrapper = shallow(
				<DateTimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dafeFormat: 'DD/MM/YYYY' }}
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

		it('should convert valid date to ise-datetime', () => {
			// given
			const onChange = jest.fn();
			const isoSchema = {
				...schema,
				schema: { format: 'iso-datetime' },
			};
			const wrapper = mount(
				<DateTimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dafeFormat: 'DD/MM/YYYY' }}
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

		it('should call props onFinish when there is no error', () => {
			// given
			const onFinish = jest.fn();
			const wrapper = mount(
				<DateTimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={jest.fn()}
					onFinish={onFinish}
					options={{ dafeFormat: 'DD/MM/YYYY' }}
					schema={schema}
					value={'15/02/2018'}
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

		it('should NOT call props onFinish when there is an error', () => {
			// given
			const onFinish = jest.fn();
			const wrapper = mount(
				<DateTimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={jest.fn()}
					onFinish={onFinish}
					options={{ dafeFormat: 'DD/MM/YYYY' }}
					schema={schema}
					value={'15/02/2018'}
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
