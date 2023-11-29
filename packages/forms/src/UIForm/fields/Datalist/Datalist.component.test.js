/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Datalist from './Datalist.component';

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
			await expect(props.onTrigger).toHaveBeenCalledWith(expect.anything(), {
				trigger: props.schema.triggers[0],
				schema: props.schema,
				errors: props.errors,
				properties: props.properties,
			});
		});

		it('should call get titleMap from onChange and send it to props.onChange and props.onFinish', async () => {
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
			await userEvent.click(screen.getByRole('textbox'));
			expect(props.onTrigger).toHaveBeenCalledWith(expect.anything(), {
				schema: props.schema,
				trigger: props.schema.triggers[0],
				errors: props.errors,
				properties: props.properties,
			});
			await screen.findByRole('listbox');
			await userEvent.click(screen.getByText('Foo'));
			fireEvent.blur(screen.getByRole('textbox'));

			expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
				schema: { ...props.schema, titleMap: data.titleMap },
				value: 'foo',
			});
			expect(props.onFinish).toHaveBeenCalledWith(expect.anything(), {
				schema: { ...props.schema, titleMap: data.titleMap },
				value: 'foo',
			});
		});
	});

	describe('getTitleMap', () => {
		it('should return array from schema.titleMap', async () => {
			// when
			const props = {
				onChange: jest.fn(),
				onFinish: jest.fn(),
				onTrigger: jest.fn(),
				schema,
				value: '',
			};
			const instance = new Datalist(props);
			const options = instance.getTitleMap();
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
			const instance = new Datalist(props);
			instance.state = {
				...instance.state,
				titleMap: [
					{ name: 'Hello', value: 'hello' },
					{ name: 'World', value: 'world' },
				],
			};
			const options = instance.getTitleMap();

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
			const instance = new Datalist(props);
			const options = instance.getTitleMap();

			// then
			expect(options).toEqual([
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
			const instance = new Datalist(props);
			const options = instance.getTitleMap();

			// then
			expect(options).toEqual([
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
				t: jest.fn(key => key),
			};

			// when
			const instance = new Datalist(props);
			const options = instance.getTitleMap();

			// then
			expect(options).toEqual([
				{
					suggestions: [
						{ name: 'Foo', value: 'foo' },
						{ name: 'Bar', value: 'bar' },
						{ name: 'Lol', value: 'lol' },
					],
					title: 'lol',
				},
				{
					suggestions: [{ name: 'hello_name', value: 'hello' }],
					title: 'TF_DATALIST_CUSTOM_SECTION',
				},
			]);
			expect(props.t).toHaveBeenCalledWith('TF_DATALIST_CUSTOM_SECTION', {
				defaultValue: 'CUSTOM',
			});
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
			const instance = new Datalist(props);
			const options = instance.getTitleMap();

			// then
			expect(options).toEqual([
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
			const instance = new Datalist({
				...props,
				initialCheckValue: true,
			});
			instance.setState = jest.fn(v => (instance.state = { ...instance.state, ...v }));
			instance.componentDidMount();
			expect(instance.setState).toHaveBeenCalledWith({
				errorMessage,
				isValid: false,
			});
			expect(instance.state.errorMessage).toBe(errorMessage);
			expect(instance.state.isValid).toBe(false);
		});
		it('should NOT set a state, given a multisection schema', () => {
			const instance = new Datalist({ ...props });
			instance.setState = jest.fn(v => (instance.state = { ...instance.state, ...v }));
			instance.componentDidMount();

			expect(instance.setState).not.toHaveBeenCalled();
			expect(instance.state.isValid).toBe(true);
			expect(instance.state.errorMessage).toBe(undefined);
		});
		it('should set a state, given simple schema', () => {
			const instance = new Datalist({ ...props, schema, initialCheckValue: true });
			instance.setState = jest.fn(v => (instance.state = { ...instance.state, ...v }));
			instance.componentDidMount();
			expect(instance.state.isValid).toBe(false);
			expect(instance.state.errorMessage).toBe(errorMessage);
		});
		it('should NOT set a state, given a simple schema', () => {
			const instance = new Datalist({ ...props, schema });
			instance.setState = jest.fn(v => (instance.state = { ...instance.state, ...v }));
			instance.componentDidMount();
			expect(instance.state.isValid).toBe(true);
			expect(instance.state.errorMessage).toBe(undefined);
		});
		it('should change value and the check should pass', () => {
			const selectedValue = { label: 'Bar', value: 'bar' };
			const event = { type: 'change' };
			const instance = new Datalist({ ...props, initialCheckValue: true });
			instance.setState = jest.fn(v => (instance.state = { ...instance.state, ...v }));
			instance.componentDidMount();

			instance.onChange(event, selectedValue);
			expect(instance.setState).toHaveBeenCalledWith({
				isValid: true,
				errorMessage: undefined,
			});
			expect(instance.state.isValid).toBe(true);
			expect(instance.state.errorMessage).toBe(undefined);
		});
	});
});
