import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import omit from 'lodash/omit';

import Select from './Select.component';

jest.unmock('@talend/design-system');

describe('Select field', () => {
	const schema = {
		autoFocus: true,
		description: 'Select me',
		placeholder: 'Please select a value',
		required: true,
		schema: {
			enum: ['foo', 'bar', 'lol'],
			type: 'string',
		},
		title: 'My Select title',
		titleMap: [
			{ name: 'My foo title', value: 'foo' },
			{ name: 'My bar title', value: 'bar' },
			{ name: 'My lol title', value: 'lol' },
		],
		type: 'select',
	};

	it('should render simple select', () => {
		// when
		const { container } = render(
			<Select
				id="mySelect"
				isValid
				errorMessage="My Error Message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value="lol"
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render simple select without placeholder', () => {
		// given
		const localSchema = omit(schema, 'placeholder');

		// when
		render(
			<Select
				id="mySelect"
				isValid
				errorMessage="My Error Message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={localSchema}
				value="lol"
			/>,
		);

		// then
		expect(screen.queryByText('Please select a value')).not.toBeInTheDocument();
	});

	it('should render select multiple', () => {
		// given
		const multipleSchema = {
			...schema,
			multiple: true,
			schema: {
				type: 'array',
				uniqueItems: true,
				items: schema.schema,
			},
		};

		// when
		render(
			<Select
				id="mySelect"
				isValid
				errorMessage="My Error Message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={multipleSchema}
				value={['foo', 'lol']}
			/>,
		);

		// then
		expect(screen.getByRole('listbox')).toHaveAttribute('multiple');
	});

	it('should render disabled input', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		render(
			<Select
				id="mySelect"
				isValid
				errorMessage="My Error Message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={disabledSchema}
				value="lol"
			/>,
		);

		// then
		expect(screen.getByRole('combobox')).toBeDisabled();
	});

	it('should render readOnly input', () => {
		// given
		const readOnlySchema = {
			...schema,
			readOnly: true,
		};

		// when
		render(
			<Select
				id="mySelect"
				isValid
				errorMessage="My Error Message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={readOnlySchema}
				value="lol"
			/>,
		);

		// then
		expect(screen.getByRole('combobox')).toHaveAttribute('readonly');
	});

	it('should trigger onChange', () => {
		// given
		const onChange = jest.fn();
		render(
			<Select
				id="mySelect"
				isValid
				errorMessage="My Error Message"
				onChange={onChange}
				onFinish={jest.fn()}
				schema={schema}
				value="lol"
			/>,
		);
		const event = { target: { value: 'bar' } };

		// when
		fireEvent.change(screen.getByRole('combobox'), event);

		// then
		expect(onChange).toHaveBeenCalledWith(expect.anything(event), { schema, value: 'bar' });
	});

	it('should trigger array onChange', async () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		const multipleSchema = {
			...schema,
			multiple: true,
			schema: {
				type: 'array',
				uniqueItems: true,
				items: schema.schema,
			},
		};
		render(
			<Select
				id="mySelect"
				isValid
				errorMessage="My Error Message"
				onChange={onChange}
				onFinish={onFinish}
				schema={multipleSchema}
				value={[]}
			/>,
		);

		// when
		await userEvent.selectOptions(screen.getByRole('listbox'), ['foo', 'lol']);

		// then
		expect(onChange.mock.calls[0][1]).toMatchObject({
			schema: multipleSchema,
			value: ['foo'],
		});
		expect(onChange.mock.calls[1][1]).toMatchObject({
			schema: multipleSchema,
			value: ['lol'],
		});
		expect(onFinish.mock.calls[0][1]).toMatchObject({
			schema: multipleSchema,
			value: ['foo'],
		});
		expect(onFinish.mock.calls[1][1]).toMatchObject({
			schema: multipleSchema,
			value: ['lol'],
		});
	});
});
