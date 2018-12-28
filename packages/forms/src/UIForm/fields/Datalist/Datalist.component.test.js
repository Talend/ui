import React from 'react';
import { shallow } from 'enzyme';
import DatalistComponent from '@talend/react-components/lib/Datalist';
import Datalist from './Datalist.component';

const schema = {
	autoFocus: true,
	description: 'This is my datalist',
	disabled: false,
	placeholder: 'Type here',
	readOnly: false,
	required: true,
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

const schemaMultiSection = {
	autoFocus: true,
	description: 'This is my datalist',
	disabled: false,
	placeholder: 'Type here',
	readOnly: false,
	required: true,
	restricted: true,
	title: 'My List',
	options: {
		isMultiSection: true,
		titleMap: [
			{
				title: 'test1',
				suggestions: [{ name: 'Foo2', value: 'foo2' }, { name: 'Lol', value: 'lol' }],
			},
			{
				title: 'test2',
				suggestions: [{ name: 'Foo', value: 'foo' }, { name: 'Bar', value: 'bar' }],
			},
		],
	},

	type: 'string',
	schema: {
		type: 'string',
	},
};

describe('Datalist component', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<Datalist.WrappedComponent
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

	it('should render with multisection', () => {
		// when
		const wrapper = shallow(
			<Datalist.WrappedComponent
				id={'my-datalist'}
				isValid
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={schemaMultiSection}
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
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);
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
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);
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
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);
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
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);
			const event = { type: 'focus', target: wrapper.instance() };

			// when
			wrapper
				.find(DatalistComponent)
				.props()
				.onFocus(event);

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
				value: '',
			};
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);
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
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);
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
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);

			// then
			expect(wrapper.find(DatalistComponent).prop('titleMap')).toEqual([
				{ name: 'Foo', value: 'foo' },
				{ name: 'Bar', value: 'bar' },
				{ name: 'Lol', value: 'lol' },
				{ name: 'hello_name', value: 'hello' },
			]);
		});

		it('should NOT add empty value to the titleMap', () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema: { ...schema, restricted: false },
				value: '',
			};
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);

			// then
			expect(wrapper.find(DatalistComponent).prop('titleMap')).toEqual([
				{ name: 'Foo', value: 'foo' },
				{ name: 'Bar', value: 'bar' },
				{ name: 'Lol', value: 'lol' },
			]);
		});

		it('should add unknown value with custom category to the titleMap if not restricted', () => {
			// given
			const multiSectionSchema = {
				...schema,
				options: {
					isMultiSection: true,
					titleMap: [
						{
							title: 'lol',
							suggestions: [
								{ name: 'Foo', value: 'foo' },
								{ name: 'Bar', value: 'bar' },
								{ name: 'Lol', value: 'lol' },
							],
						},
					],
				},
				titleMap: undefined,
			};
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema: { ...multiSectionSchema, restricted: false },
				value: 'hello',
				resolveName: value => `${value}_name`,
			};

			// when
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);

			// then
			expect(wrapper.find(DatalistComponent).prop('titleMap')).toEqual([
				{
					suggestions: [
						{ name: 'Foo', value: 'foo' },
						{ name: 'Bar', value: 'bar' },
						{ name: 'Lol', value: 'lol' },
					],
					title: 'lol',
				},
				{ suggestions: [{ name: 'hello_name', value: 'hello' }], title: 'CUSTOM' },
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
			const wrapper = shallow(<Datalist.WrappedComponent {...props} />);

			// then
			expect(wrapper.find(DatalistComponent).prop('titleMap')).toEqual([
				{ name: 'Foo', value: 'foo' },
				{ name: 'Bar', value: 'bar' },
				{ name: 'Lol', value: 'lol' },
			]);
		});
	});
});
