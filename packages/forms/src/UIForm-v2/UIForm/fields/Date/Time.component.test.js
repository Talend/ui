import React from 'react';
import { shallow } from 'enzyme';

import TimeWidget from './Time.component';

describe('Time component', () => {
	const schema = {
		autoFocus: true,
		description: 'talend time picker',
		required: true,
		title: 'Select Time',
		type: 'text',
	};
	it('should render an InputTimePicker', () => {
		const wrapper = shallow(
			<TimeWidget
				id={'myForm'}
				isValid={false}
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value={'12:34'}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should trigger onFinish on picker blur', () => {
		// given
		const onFinish = jest.fn();
		const wrapper = shallow(
			<TimeWidget
				id={'myForm'}
				isValid={false}
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={onFinish}
				schema={schema}
				value={'12:00'}
			/>,
		);
		expect(onFinish).not.toBeCalled();
		const event = { target: {} };

		// when
		wrapper.find('InputTimePicker').simulate('blur', event);

		// then
		expect(onFinish).toBeCalled();
	});
	describe('onChange', () => {
		it('should call props onChange', () => {
			// given
			const onChange = jest.fn();
			const wrapper = shallow(
				<TimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={onChange}
					onFinish={jest.fn()}
					schema={schema}
				/>,
			);
			expect(onChange).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				time: { hours: '12', minutes: '34' },
				textInput: '12:34',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputTimePicker').simulate('change', event, payload);

			// then
			expect(onChange).toBeCalledWith(event, { schema, value: '12:34' });
		});
		it('should call onChange with null value when there is error', () => {
			// given
			const onChange = jest.fn();
			const wrapper = shallow(
				<TimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={onChange}
					onFinish={jest.fn()}
					schema={schema}
				/>,
			);
			expect(onChange).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				textInput: 'ddd',
				errorMessage: 'Time is invalid',
			};

			// when
			wrapper.find('InputTimePicker').simulate('change', event, payload);

			// then
			expect(onChange).toBeCalledWith(event, { schema, value: null });
		});
		it('should not throw any error message', () => {
			// given
			const onChange = jest.fn();
			const wrapper = shallow(
				<TimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={onChange}
					onFinish={jest.fn()}
					schema={schema}
				/>,
			);
			expect(onChange).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				time: null,
				textInput: '',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputTimePicker').simulate('change', event, payload);

			// then
			expect(onChange).toBeCalledWith(event, {
				schema,
				value: '',
			});
		});
		it('should call props onFinish when there is no error', () => {
			// given
			const onFinish = jest.fn();
			const wrapper = shallow(
				<TimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={jest.fn()}
					onFinish={onFinish}
					schema={schema}
				/>,
			);
			expect(onFinish).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				time: { hours: '12', minutes: '34' },
				textInput: '12:34',
				errorMessage: undefined,
			};

			// when
			wrapper.find('InputTimePicker').simulate('change', event, payload);

			// then
			expect(onFinish).toBeCalledWith(event, { schema, value: '12:34' });
		});
		it('should NOT call props onFinish when there is an error', () => {
			// given
			const onFinish = jest.fn();
			const wrapper = shallow(
				<TimeWidget
					id={'myForm'}
					isValid={false}
					errorMessage={'My error message'}
					onChange={jest.fn()}
					onFinish={onFinish}
					schema={schema}
				/>,
			);
			expect(onFinish).not.toBeCalled();
			const event = { target: {} };
			const payload = {
				time: null,
				textInput: '99:100',
				errorMessage: 'THERE IS AN ERROR',
			};

			// when
			wrapper.find('InputTimePicker').simulate('change', event, payload);

			// then
			expect(onFinish).not.toBeCalled();
		});
	});
});
