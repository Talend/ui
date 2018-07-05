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
			expect(props.onChange).toHaveBeenCalled();
			expect(props.onFinish).toHaveBeenCalled();
			expect(props.onFinish.mock.calls[0][0]).toEqual(event);
			expect(event.type).toBe('change');
			expect(props.onChange.mock.calls[0][1].value).toBe('bar');
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
			wrapper.instance().onFocus({ type: 'focus' });

			// then
			expect(props.onTrigger).toHaveBeenCalled();
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
		it('should add props.value to the titleMap', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema,
				value: 'hello',
			};
			const wrapper = shallow(<Datalist {...props} />);
			const titleMap = wrapper.instance().getTitleMap();

			// then
			expect(titleMap).toEqual([
				{ name: 'Foo', value: 'foo' },
				{ name: 'Bar', value: 'bar' },
				{ name: 'Lol', value: 'lol' },
				{ name: 'hello', value: 'hello' },
			]);
		});
	});
});
