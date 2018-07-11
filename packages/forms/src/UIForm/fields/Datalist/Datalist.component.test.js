import React from 'react';
import { shallow } from 'enzyme';
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
	it('should call onFocus at didMount if no titleMap', () => {
		// when
		const schemaWithout = {
			type: 'string',
			schema: {
				type: 'string',
			},
		};
		const wrapper = shallow(
			<Datalist
				id={'my-datalist'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={schemaWithout}
				value={'foo'}
			/>,
		);
		wrapper.instance().onFocus = jest.fn();
		wrapper.instance().componentDidMount();

		// then
		expect(wrapper.instance().onFocus).toHaveBeenCalledWith({ type: 'mount' });
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
			wrapper.instance().onChange(selectedValue);

			// then
			expect(props.onChange).toHaveBeenCalled();
			expect(props.onFinish).toHaveBeenCalled();
			const event = props.onChange.mock.calls[0][0];
			expect(props.onFinish.mock.calls[0][0]).toEqual(event);
			expect(event.type).toBe('change');
			expect(event.target.value).toBe('bar');
			expect(wrapper.state('added')).toEqual([{ label: 'Bar', value: 'bar' }]);
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
			const wrapper = shallow(<Datalist {...props} />);
			wrapper.instance().onChange();
			// then
			const event = props.onChange.mock.calls[0][0];
			expect(event.target.value).toBeUndefined();
			expect(event.target.options).toBeUndefined();
		});
		it('should support multiple values', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema: {
					type: 'string',
					schema: {
						type: 'array',
					},
					titleMap: [
						{ name: 'foo', value: 'foo' },
						{ name: 'bar', value: 'bar' },
						{ name: 'baz', value: 'baz' },
					],
				},
			};
			const wrapper = shallow(<Datalist {...props} />);
			wrapper.instance().onChange([{ value: 'foo' }, { value: 'bar' }]);
			// then
			const event = props.onChange.mock.calls[0][0];
			expect(event.target.value).toBeUndefined();
			expect(event.target.options).toEqual([
				{ value: 'foo', selected: true },
				{ value: 'bar', selected: true },
				{ value: 'baz', selected: false },
			]);
		});
	});
	describe('onFocus', () => {
		it('should call onTrigger when triggers has onEvent="focus"', done => {
			// when
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
			wrapper.instance().onFocus(event);

			// then
			expect(props.onTrigger).toHaveBeenCalled();
			expect(event.type).toBe('focus');
			expect(wrapper.state('isLoading')).toBe(true);
		});
	});

	describe('getOptions', () => {
		it('should return array from schema.titleMap', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema,
			};
			const wrapper = shallow(<Datalist {...props} />);
			const options = wrapper.instance().getOptions();

			// then
			expect(options).toEqual([
				{ label: 'Foo', value: 'foo' },
				{ label: 'Bar', value: 'bar' },
				{ label: 'Lol', value: 'lol' },
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
			const options = wrapper.instance().getOptions();

			// then
			expect(options).toEqual([
				{ label: 'Hello', value: 'hello' },
				{ label: 'World', value: 'world' },
			]);
		});
		it('should add state.added options', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema,
			};
			const wrapper = shallow(<Datalist {...props} />);
			wrapper.setState({
				added: [{ label: 'Hello', value: 'hello' }, { label: 'World', value: 'world' }],
			});
			const options = wrapper.instance().getOptions();

			// then
			expect(options).toEqual([
				{ label: 'Hello', value: 'hello' },
				{ label: 'World', value: 'world' },
				{ label: 'Foo', value: 'foo' },
				{ label: 'Bar', value: 'bar' },
				{ label: 'Lol', value: 'lol' },
			]);
		});
		it('should add props.value to the options', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema,
				value: 'hello',
			};
			const wrapper = shallow(<Datalist {...props} />);
			const options = wrapper.instance().getOptions();

			// then
			expect(options).toEqual([
				{ label: 'Foo', value: 'foo' },
				{ label: 'Bar', value: 'bar' },
				{ label: 'Lol', value: 'lol' },
				{ label: 'hello', value: 'hello' },
			]);
		});
	});
});
