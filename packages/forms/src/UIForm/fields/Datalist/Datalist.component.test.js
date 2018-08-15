import React from 'react';
import { shallow, mount } from 'enzyme';
import Datalist from './Datalist.component';

const schema = {
	autoFocus: true,
	description: 'This is my datalist',
	disabled: false,
	placeholder: 'Type here',
	readOnly: false,
	restricted: true,
	title: 'My List',
	titleMap: [
		{ name: 'Foo', value: 'foo' },
		{ name: 'Bar', value: 'bar' },
		{ name: 'Lol', value: 'lol' },
	],
	type: 'string',
	schema: {
		type: 'string',
	},
};

describe('Datalist component', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<Datalist
				id={'my-datalist'}
				isValid
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={schema}
				value={'foo'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});



	describe('onLiveChange', () => {
		it('should call triggers onLiveChange', () => {
			// given
			const onEvent = 'change';
			const trigger = {
				onEvent,
			};
			const schema = {
				type: 'string',
				schema: {
					type: 'string',
				},
				triggers: [
					trigger,
				],
			};
			const onTrigger = jest.fn();
			const input = mount(<Datalist
				onChange={jest.fn()}
				onTrigger={(e, p) => {
					onTrigger(e, p); // ensure we capture it
					return new Promise((resolve, reject) => resolve({}));
				}}
				onFinish={jest.fn()}
				schema={schema}
			/>).find('input').at(0);

			// when
			input.simulate('change', { target: { value: 'x' }});

			// then
			expect(onTrigger).toHaveBeenCalledWith(expect.anything(), {
				schema,
				trigger,
				properties: 'x', // no form so it ends up like that
			});
		});
	});

	describe('onChange', () => {
		it('should call props.onChange && props.onFinish', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema: {
					type: 'string',
					schema: {
						type: 'string',
					},
				},
			};
			const wrapper = shallow(<Datalist {...props} />);
			const selectedValue = { label: 'Bar', value: 'bar' };
			const event = { type: 'change' };
			wrapper.instance().onChange(event, selectedValue);

			// then
			expect(props.onChange).toHaveBeenCalledWith(event, {
				schema: props.schema,
				...selectedValue,
			});
			expect(props.onFinish).toHaveBeenCalledWith(event, {
				schema: props.schema,
				...selectedValue,
			});
		});

		it('should rebuild schema to match restriction on validation', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema,
			};
			const wrapper = shallow(<Datalist {...props} />);
			const selectedValue = { label: 'Bar', value: 'bar' };
			const event = { type: 'change' };
			wrapper.instance().setState({
				titleMap: [
					{ name: 'my_name', value: 'my' },
					{ name: 'title_name', value: 'title' },
					{ name: 'map_name', value: 'map' },
				],
			});
			wrapper.instance().onChange(event, selectedValue);

			// then
			const generatedSchema = {
				...schema,
				schema: {
					...schema.schema,
					enum: ['my', 'title', 'map'],
				},
			};
			expect(props.onChange).toBeCalledWith(event, {
				schema: generatedSchema,
				...selectedValue,
			});
			expect(props.onFinish).toBeCalledWith(event, {
				schema: generatedSchema,
				...selectedValue,
			});
		});

		it('should support undefined value', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema: {
					type: 'string',
					schema: {
						type: 'string',
					},
				},
			};
			const event = { type: 'change' };
			const payload = undefined;
			const wrapper = shallow(<Datalist {...props} />);
			wrapper.instance().onChange(event, payload);
			// then
			expect(props.onChange).toHaveBeenCalledWith(event, { schema: props.schema });
		});
	});

	describe('onFocus', () => {
		it('should call onTrigger when triggers has onEvent="focus"', done => {
			// given
			const data = { titleMap: [{ name: 'Foo', value: 'foo' }] };
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(
					event =>
						new Promise(resolve => {
							// hack: to be sure we catch the setState after the promise
							setTimeout(() => {
								expect(event.target.state.isLoading).toBe(false);
								done();
							}, 0);
							return resolve(data);
						}),
				),
				schema: {
					type: 'string',
					schema: {
						type: 'string',
					},
					triggers: [
						{
							onEvent: 'focus',
						},
					],
				},
			};
			const wrapper = shallow(<Datalist {...props} />);
			const event = { type: 'focus', target: wrapper.instance() };

			// when
			wrapper
				.find('FieldTemplate')
				.find('Datalist')
				.prop('onFocus')(event);

			// then
			expect(props.onTrigger).toBeCalledWith(event, {
				trigger: props.schema.triggers[0],
				schema: props.schema,
				errors: props.errors,
				properties: props.properties,
			});
			expect(wrapper.state('isLoading')).toBe(true);
		});
	});

	describe('getTitleMap', () => {
		it('should return array from schema.titleMap', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema,
			};
			const wrapper = shallow(<Datalist {...props} />);
			const options = wrapper.instance().getTitleMap();

			// then
			expect(options).toEqual([
				{ name: 'Foo', value: 'foo' },
				{ name: 'Bar', value: 'bar' },
				{ name: 'Lol', value: 'lol' },
			]);
		});

		it('should give priority to state.titleMap', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema,
			};
			const wrapper = shallow(<Datalist {...props} />);
			wrapper.setState({
				titleMap: [{ name: 'Hello', value: 'hello' }, { name: 'World', value: 'world' }],
			});
			const options = wrapper.instance().getTitleMap();

			// then
			expect(options).toEqual([
				{ name: 'Hello', value: 'hello' },
				{ name: 'World', value: 'world' },
			]);
		});

		it('should add unknown value to the titleMap if not restricted', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema: { ...schema, restricted: false },
				value: 'hello',
				resolveName: value => `${value}_name`,
			};
			const wrapper = shallow(<Datalist {...props} />);

			// then
			expect(
				wrapper
					.find('FieldTemplate')
					.find('Datalist')
					.prop('titleMap'),
			).toEqual([
				{ name: 'Foo', value: 'foo' },
				{ name: 'Bar', value: 'bar' },
				{ name: 'Lol', value: 'lol' },
				{ name: 'hello_name', value: 'hello' },
			]);
		});

		it('should NOT add unknown value on restricted datalist', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema,
				value: 'hello',
			};
			const wrapper = shallow(<Datalist {...props} />);

			// then
			expect(
				wrapper
					.find('FieldTemplate')
					.find('Datalist')
					.prop('titleMap'),
			).toEqual([
				{ name: 'Foo', value: 'foo' },
				{ name: 'Bar', value: 'bar' },
				{ name: 'Lol', value: 'lol' },
			]);
		});
	});
});
