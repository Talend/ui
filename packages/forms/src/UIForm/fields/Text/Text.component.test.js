import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Text from './Text.component';

jest.unmock('@talend/design-system');

describe('Text field', () => {
	const defaultSchema = {
		autoFocus: true,
		description: 'my text input hint',
		placeholder: 'Type something here',
		required: true,
		title: 'My input title',
		type: 'text',
		schema: {
			type: 'string',
		},
	};

	const defaultProps = {
		id: 'myForm',
		isValid: true,
		errorMessage: 'My error message',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		value: 'toto',
		schema: defaultSchema,
	};

	it('should render input', () => {
		// when
		const { container } = render(<Text {...defaultProps} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render password input', () => {
		// given
		const props = {
			...defaultProps,
			schema: { ...defaultSchema, type: 'password' },
		};

		// when
		render(<Text {...props} />);

		// then
		expect(screen.getByLabelText('My input title')).toHaveAttribute('type', 'password');
	});

	it('should render disabled input', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				disabled: true,
			},
		};

		// when
		render(<Text {...props} />);

		// then
		expect(screen.getByLabelText('My input title')).toBeDisabled();
	});

	it('should render readonly input', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				readOnly: true,
			},
		};

		// when
		render(<Text {...props} />);

		// then
		expect(screen.getByLabelText('My input title')).toHaveAttribute('readonly');
	});

	it('should render input with min attribute', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				schema: {
					...defaultSchema.schema,
					type: 'number',
					minimum: 0,
				},
			},
		};

		// when
		render(<Text {...props} />);

		// then
		expect(screen.getByLabelText('My input title')).toHaveAttribute('min', '0');
	});

	it('should render input with max attribute', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				schema: {
					...defaultSchema.schema,
					type: 'number',
					maximum: 10,
				},
			},
		};

		// when
		render(<Text {...props} />);

		// then
		expect(screen.getByLabelText('My input title')).toHaveAttribute('max', '10');
	});

	it('should render input with step attribute', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				type: 'number',
				schema: {
					type: 'number',
					step: 0.01,
				},
			},
		};

		// when
		render(<Text {...props} />);

		// then
		expect(screen.getByLabelText('My input title')).toHaveAttribute('step', '0.01');
	});

	it('should trigger onChange', async () => {
		// given
		const onChange = jest.fn();
		const props = { ...defaultProps, onChange };
		render(<Text {...props} />);
		const event = { target: { value: 'totoa' } };

		// when
		screen.getByLabelText('My input title').focus();
		await userEvent.keyboard('totoa');
		screen.getByLabelText('My input title').blur();

		// wrapper.find('input').simulate('change', event);

		// then
		expect(onChange).toHaveBeenLastCalledWith(expect.anything(event), {
			schema: defaultSchema,
			value: 'totoa',
		});
	});

	it('should trigger onChange with number value', async () => {
		// given
		const schema = { ...defaultSchema, type: 'number' };
		const onChange = jest.fn();
		const props = { ...defaultProps, onChange, schema };
		render(<Text {...props} />);
		const event = { target: { value: '25' } };

		// when
		screen.getByLabelText('My input title').focus();
		fireEvent.change(screen.getByLabelText('My input title'), event);
		screen.getByLabelText('My input title').blur();

		// then
		expect(onChange).toHaveBeenLastCalledWith(expect.anything(event), { schema, value: 25 });
	});

	it('should trigger onFinish on input blur', () => {
		// given
		const onFinish = jest.fn();
		const props = { ...defaultProps, onFinish };
		render(<Text {...props} />);
		const event = { target: { value: 'totoa' } };

		// when
		screen.getByLabelText('My input title').blur();

		// then
		expect(onFinish).toBeCalledWith(expect.anything(event), { schema: defaultSchema });
	});

	it('should render hidden input', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				type: 'hidden',
			},
		};

		// when
		render(<Text {...props} />);

		// then
		expect(document.querySelector('input')).toHaveAttribute('type', 'hidden');
	});

	it('should pass autoComplete to input', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				autoComplete: 'off',
			},
		};

		// when
		render(<Text {...props} />);

		// then
		expect(screen.getByLabelText('My input title')).toHaveAttribute('autoComplete', 'off');
	});

	it('should pass labelProps to Text field', () => {
		// given
		const labelProps = { className: 'hello' };
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				labelProps,
			},
		};

		// when
		render(<Text {...props} />);

		// then
		expect(screen.getByText('My input title')).toHaveClass('hello');
	});

	it('should pass link props and password type to Text field', () => {
		// given
		const link = {
			href: 'https://talend.com',
			title: 'Helps to reset your password',
			children: 'Need help to log in?',
			'aria-label': 'Need help to log in?',
		};

		const props = {
			...defaultProps,
			schema: {
				autoFocus: true,
				placeholder: 'Enter your password',
				required: true,
				title: 'Password',
				type: 'password',
				link,
			},
		};

		// when
		render(<Text {...props} />);

		screen.debug();
		// then
		expect(screen.getByTitle(link.title)).toHaveTextContent(link.children);
		expect(screen.getByTestId('link.icon.external')).toBeVisible();
	});
});
