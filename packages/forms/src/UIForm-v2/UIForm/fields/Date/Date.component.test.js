import React from 'react';
import { shallow } from 'enzyme';
import DateWidget from './Date.component';

describe('Date widget', () => {
	const schema = {
		autoFocus: true,
		description: 'my date picker',
		placeholder: 'Type your date here',
		required: true,
		title: 'My date title',
		type: 'text',
		schema: { type: 'string' },
	};

	it('should render date picker', () => {
		// when
		const wrapper = shallow(
			<DateWidget
				id={'myForm'}
				isValid={false}
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				options={{ dafeFormat: 'DD/MM/YYYY' }}
				schema={schema}
				value={'15/02/2018 23:55:32'}
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
		const wrapper = shallow(
			<DateWidget
				id={'myForm'}
				isValid={false}
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				options={{ dafeFormat: 'DD/MM/YYYY' }}
				schema={isoSchema}
				useTime
				useSeconds
				value={value}
			/>,
		);

		// then
		expect(wrapper.find('InputDatePicker').prop('value')).toEqual(new Date(value));
	});

	it('should trigger onFinish on picker blur', () => {
		// given
		const onFinish = jest.fn();
		const wrapper = shallow(
			<DateWidget
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
		wrapper.find('InputDatePicker').simulate('blur', event);

		// then
		expect(onFinish).toBeCalled();
	});

	describe('onChange', () => {
		it('should call props onChange', () => {
			// given
			const onChange = jest.fn();
			const wrapper = shallow(
				<DateWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={onChange}
					onFinish={jest.fn()}
					options={{ dafeFormat: 'DD/MM/YYYY' }}
					schema={schema}
					value={'15/02/2018'}
				/>,
			);
			expect(onChange).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				date: new Date(2015, 9, 21),
				textInput: '2015-09-21',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDatePicker').simulate('change', event, payload);

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
			const wrapper = shallow(
				<DateWidget
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
				date: new Date(2015, 9, 21),
				textInput: '2015-09-21',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDatePicker').simulate('change', event, payload);

			// then
			expect(onChange).toBeCalledWith(event, {
				schema: timestampSchema,
				value: payload.date.getTime(),
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
				<DateWidget
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
				date: undefined,
				textInput: '',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDatePicker').simulate('change', event, payload);

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
			const wrapper = shallow(
				<DateWidget
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
				date: new Date(2015, 9, 21),
				textInput: '2015-09-21',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDatePicker').simulate('change', event, payload);

			// then
			expect(onChange).toBeCalledWith(event, {
				schema: isoSchema,
				value: payload.date.toISOString(),
			});
		});

		it('should call props onFinish when there is no error', () => {
			// given
			const onFinish = jest.fn();
			const wrapper = shallow(
				<DateWidget
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
				date: new Date(2015, 9, 21),
				textInput: '2015-09-21',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputDatePicker').prop('onChange')(event, payload);

			// then
			expect(onFinish).toBeCalledWith(event, { schema, value: '2015-09-21' });
		});

		it('should NOT call props onFinish when there is an error', () => {
			// given
			const onFinish = jest.fn();
			const wrapper = shallow(
				<DateWidget
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
				date: new Date(''), // invalid error
				textInput: '2015-09-aa',
				errorMessage: 'THERE IS AN ERROR',
			};

			// when
			wrapper.find('InputDatePicker').simulate('change', event, payload);

			// then
			expect(onFinish).not.toBeCalled();
		});
	});
});
