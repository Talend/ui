import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MultiSelectTag from './MultiSelectTag.component';

jest.unmock('@talend/design-system');

describe('MultiSelectTag field', () => {
	const props = {
		id: 'my-select-tag',
		isValid: true,
		errorMessage: 'This is wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		onTrigger: jest.fn(),
		schema: {
			autoFocus: true,
			description: 'This is the MultiSelectTag field',
			disabled: false,
			placeholder: 'Type here',
			readOnly: false,
			required: true,
			restricted: false,
			title: 'Tags',
			titleMap: [
				{ name: 'toto', value: 'titi' },
				{ name: 'tata', value: 'tutu' },
				{ name: 'totomobile', value: 'totomobile' },
			],
			dataTest: 'item',
		},
		value: ['aze', 'tutu'],
	};

	it('should render input', () => {
		// when
		render(<MultiSelectTag {...props} />);

		// then
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('should render suggestions on focus', async () => {
		// given
		render(<MultiSelectTag {...props} />);

		// when
		await userEvent.click(screen.getByRole('textbox'));

		// then
		expect(screen.getByRole('listbox')).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'toto' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'totomobile' })).toBeInTheDocument();
		expect(screen.queryByRole('option', { name: 'tata' })).not.toBeInTheDocument(); // preset in value, not iin suggestionos
	});

	it('should update suggestion on input change', async () => {
		// given
		render(<MultiSelectTag {...props} />);
		const input = screen.getByRole('textbox');

		// when
		await userEvent.click(input);
		await userEvent.type(input, 'mobile');

		// then
		expect(screen.getByRole('listbox')).toBeInTheDocument();
		expect(screen.getByTitle('totomobile')).toBeInTheDocument();
		expect(screen.queryByRole('option', { name: 'toto' })).not.toBeInTheDocument();
	});

	it('should update suggestion on props.value change', async () => {
		// given
		const { rerender } = render(<MultiSelectTag {...props} />);
		expect(screen.getByRole('option', { name: 'toto' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'totomobile' })).toBeInTheDocument();
		expect(screen.queryByRole('option', { name: 'tata' })).not.toBeInTheDocument();

		// when
		rerender(<MultiSelectTag {...props} value={['aze']} />);
		await userEvent.click(screen.getByRole('textbox'));

		// then
		expect(screen.getByRole('option', { name: 'toto' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'totomobile' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'tata' })).toBeInTheDocument();
	});

	it('should suggest new item creation when widget is not restricted', async () => {
		// given
		render(<MultiSelectTag {...props} />);
		const input = screen.getByRole('textbox');

		// when
		await userEvent.click(input);
		await userEvent.type(input, 'titi');

		// then
		expect(screen.getByRole('option', { name: 'titi (new)' })).toBeInTheDocument();
	});

	it('should NOT suggest new item creation when widget is restricted', async () => {
		// given
		const restrictedSchema = { ...props.schema, restricted: true };
		render(<MultiSelectTag {...props} schema={restrictedSchema} />);
		const input = screen.getByRole('textbox');

		// when
		await userEvent.click(input);
		await userEvent.type(input, 'az');

		// then
		expect(screen.queryByRole('option', { name: 'az (new)' })).not.toBeInTheDocument();
	});

	it('should NOT suggest new item creation when a value already matches', async () => {
		// given
		render(<MultiSelectTag {...props} />);
		const input = screen.getByRole('textbox');

		// when
		await userEvent.click(input);
		await userEvent.type(input, 'aze');

		// then
		expect(screen.queryByRole('option', { name: 'aze (new)' })).not.toBeInTheDocument();
	});

	it('should NOT suggest new item creation when a suggestion matches', async () => {
		// given
		render(<MultiSelectTag {...props} />);
		const input = screen.getByRole('textbox');

		// when
		await userEvent.click(input);
		await userEvent.type(input, 'toto');

		// then
		expect(screen.queryByRole('option', { name: 'toto (new)' })).not.toBeInTheDocument();
	});

	it('should add tag', async () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		render(<MultiSelectTag {...props} onChange={onChange} onFinish={onFinish} />);
		const input = screen.getByRole('textbox');

		// when
		await userEvent.click(input);
		await userEvent.keyboard('titi');
		await userEvent.click(screen.getByRole('option'));

		// then
		const payload = { schema: props.schema, value: props.value.concat('titi') };
		expect(onChange).toHaveBeenCalledWith(expect.anything(), payload);
		expect(onFinish).toHaveBeenCalledWith(expect.anything(), payload);
	});

	it('should remove tag', async () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		render(<MultiSelectTag {...props} onChange={onChange} onFinish={onFinish} />);
		const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });

		// when
		await userEvent.click(deleteButtons[0]);

		// then
		const payload = { schema: props.schema, value: props.value.slice(1) };
		expect(onChange).toHaveBeenCalledWith(expect.anything(), payload);
		expect(onFinish).toHaveBeenCalledWith(expect.anything(), payload);
	});

	it('should call onTrigger on focus', async () => {
		// given

		const data = { titleMap: [{ name: 'Foo', value: 'foo' }] };
		const triggerProps = {
			...props,
			onTrigger: jest.fn(() => Promise.resolve(data)),
			schema: {
				...props.schema,
				triggers: [{ onEvent: 'focus' }],
			},
		};
		render(<MultiSelectTag {...triggerProps} />);

		// when
		await userEvent.click(screen.getByRole('textbox'));

		// then
		expect(triggerProps.onTrigger).toHaveBeenCalledWith(expect.anything(), {
			trigger: triggerProps.schema.triggers[0],
			schema: triggerProps.schema,
			errors: triggerProps.errors,
			properties: triggerProps.properties,
		});
		const option = await screen.findByRole('option', { name: 'Foo' });
		expect(option).toBeInTheDocument();
	});

	it('should resolve name from value', () => {
		// given
		const nameResolverProps = {
			...props,
			resolveName: value => value.map(next => `${next}_name`),
		};
		render(<MultiSelectTag {...nameResolverProps} />);

		// when
		userEvent.click(screen.getByRole('textbox'));

		// then
		expect(screen.getByText('aze_name')).toBeInTheDocument();
	});

	it('should call onBlur when blurring the input', async () => {
		// given
		const onBlur = jest.fn();
		const propsWithBlur = { ...props, onBlur };
		render(<MultiSelectTag {...propsWithBlur} />);

		// when
		await fireEvent.blur(screen.getByRole('textbox'));

		// then
		expect(onBlur).toHaveBeenCalled();
	});
});
