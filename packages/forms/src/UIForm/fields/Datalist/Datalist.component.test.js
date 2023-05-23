/* eslint-disable testing-library/no-unnecessary-act */
import { shallow } from 'enzyme';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatalistComponent from '@talend/react-components/lib/Datalist';
import Datalist from './Datalist.component';

jest.mock('ally.js');
jest.unmock('@talend/design-system');

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
	...schema,
	options: {
		isMultiSection: true,
		titleMap: [
			{
				title: 'test1',
				suggestions: [
					{ name: 'Foo2', value: 'foo2' },
					{ name: 'Lol', value: 'lol' },
				],
			},
			{
				title: 'test2',
				suggestions: [
					{ name: 'Foo', value: 'foo' },
					{ name: 'Bar', value: 'bar' },
				],
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
		const { container } = render(
			<Datalist
				id="my-datalist"
				isValid
				errorMessage="This should be correct"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={schema}
				value="foo"
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render with multisection', async () => {
		// when
		const onChange = jest.fn();
		const onFinish = jest.fn();
		render(
			<Datalist
				id="my-datalist"
				isValid
				errorMessage="This should be correct"
				onChange={onChange}
				onFinish={onFinish}
				onTrigger={jest.fn()}
				schema={schemaMultiSection}
				value="foo"
			/>,
		);

		// then
		const options = screen.getAllByRole('option');
		expect(options).toHaveLength(4);
		expect(options[0]).toHaveTextContent('Foo2');
		expect(options[1]).toHaveTextContent('Lol');
		expect(options[2]).toHaveTextContent('Foo');
		expect(options[3]).toHaveTextContent('Bar');
	});

	describe('onChange', () => {
		it('should call props.onChange && props.onFinish', async () => {
			// when
			jest.useFakeTimers();
			const props = {
				schema,
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
			};
			render(<Datalist {...props} />);
			const input = screen.getByRole('textbox');
			fireEvent.focus(input);
			fireEvent.change(input, { target: { value: 'bar' } });
			fireEvent.blur(input);
			await act(async () => {
				jest.runAllTimers(); // focus manager
				jest.useRealTimers();
			});

			// then
			const selectedValue = { value: 'bar' };
			expect(props.onChange).toHaveBeenCalledWith(
				expect.anything(),
				expect.anything({
					schema: props.schema,
					...selectedValue,
				}),
			);
			expect(props.onFinish).toHaveBeenCalledWith(
				expect.anything(),
				expect.anything({
					schema: props.schema,
					...selectedValue,
				}),
			);
		});
	});

	describe('onFocus', () => {
		it('should call onTrigger when triggers has onEvent="focus"', async () => {
			// given
			const data = { titleMap: [{ name: 'Foo', value: 'foo' }] };
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(() => {
					return new Promise(resolve => resolve(data));
				}),
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
			render(<Datalist {...props} />);

			// when
			fireEvent.focus(screen.getByRole('textbox'));

			// then
			await expect(props.onTrigger).toBeCalledWith(expect.anything(), {
				trigger: props.schema.triggers[0],
				schema: props.schema,
				errors: props.errors,
				properties: props.properties,
			});
		});

		xit('should call get titleMap from trigger and send it in onChange', async () => {
			// given
			jest.useFakeTimers();
			const data = { titleMap: [{ name: 'Foo', value: 'foo' }] };
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(() => {
					return new Promise(resolve => resolve(data));
				}),
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

			render(<Datalist {...props} />);
			fireEvent.focus(screen.getByRole('textbox'));
			// await userEvent.keyboard('{Enter}{Tab}');
			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
			fireEvent.blur(screen.getByRole('textbox'));

			jest.runAllTimers(); // focus manager
			// await act(async () => {
			// });

			jest.useRealTimers();
			await expect(props.onTrigger).toHaveBeenCalled();
			await expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
				schema: { ...props.schema, titleMap: data.titleMap },
			});
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
				titleMap: [
					{ name: 'Hello', value: 'hello' },
					{ name: 'World', value: 'world' },
				],
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
			const wrapper = shallow(<Datalist {...props} />);

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
			const wrapper = shallow(<Datalist {...props} />);

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
			const wrapper = shallow(<Datalist {...props} />);

			// then
			expect(wrapper.find(DatalistComponent).prop('titleMap')).toEqual([
				{ name: 'Foo', value: 'foo' },
				{ name: 'Bar', value: 'bar' },
				{ name: 'Lol', value: 'lol' },
			]);
		});
	});

	describe('checkValueInTitleMap', () => {
		const errorMessage = 'an error message';

		const props = {
			id: 'my-datalist',
			isValid: true,
			onChange: jest.fn(),
			onFinish: jest.fn(),
			onTrigger: jest.fn(),
			schema: schemaMultiSection,
			value: 'a not existing value',
			missingValueErrorMessage: errorMessage,
		};

		it('should set a state, given multisection schema', () => {
			const wrapper = shallow(<Datalist {...props} initialCheckValue />);

			expect(wrapper.state('isValid')).toBe(false);
			expect(wrapper.state('errorMessage')).toBe(errorMessage);
		});
		it('should NOT set a state, given a multisection schema', () => {
			const wrapper = shallow(<Datalist {...props} schema={schemaMultiSection} />);
			expect(wrapper.state('isValid')).toBe(true);
			expect(wrapper.state('errorMessage')).toBe(undefined);
		});
		it('should set a state, given simple schema', () => {
			const wrapper = shallow(<Datalist {...props} initialCheckValue />);
			expect(wrapper.state('isValid')).toBe(false);
			expect(wrapper.state('errorMessage')).toBe(errorMessage);
		});
		it('should NOT set a state, given a simple schema', () => {
			const wrapper = shallow(<Datalist {...props} schema={schema} />);
			expect(wrapper.state('isValid')).toBe(true);
			expect(wrapper.state('errorMessage')).toBe(undefined);
		});
		it('should change value and the check should pass', () => {
			const selectedValue = { label: 'Bar', value: 'bar' };
			const event = { type: 'change' };
			const wrapper = shallow(<Datalist {...props} initialCheckValue />);

			expect(wrapper.state('isValid')).toBe(false);
			expect(wrapper.state('errorMessage')).toBe(errorMessage);
			wrapper.instance().onChange(event, selectedValue);
			expect(wrapper.state('isValid')).toBe(true);
			expect(wrapper.state('errorMessage')).toBe(undefined);
		});
	});
});
