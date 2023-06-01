import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radios from './Radios.component';

jest.mock('ally.js');
jest.unmock('@talend/design-system');

describe('Radios field', () => {
	const schema = {
		autoFocus: true,
		description: 'My radios input hint',
		required: true,
		title: 'My radios title',
		titleMap: [
			{ name: 'My foo custom name', value: 'foo' },
			{ name: 'My bar custom name', value: 'bar' },
			{ name: 'My toto custom name', value: 'toto' },
		],
		type: 'radios',
	};

	it('should render radios', () => {
		// when
		const { container } = render(
			<Radios
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value="toto"
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render inline radios', () => {
		// given
		const inlineSchema = {
			...schema,
			inline: true,
		};

		// when
		render(
			<Radios
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={inlineSchema}
				value="toto"
			/>,
		);

		// then
		const radios = screen.getAllByRole('radio');
		radios.forEach(radio => expect(radio.parentElement.parentElement).toHaveClass('radio-inline'));
	});

	it('should render disabled input', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		render(
			<Radios
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={disabledSchema}
				value="toto"
			/>,
		);

		// then
		const radios = screen.getAllByRole('radio');
		radios.forEach(radio => expect(radio).toBeDisabled());
	});

	it('should trigger onChange', async () => {
		// given
		const onChange = jest.fn();
		render(
			<Radios
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={onChange}
				onFinish={jest.fn()}
				schema={schema}
				value="toto"
			/>,
		);

		// when
		await userEvent.click(screen.getAllByRole('radio')[0]);

		// then
		expect(onChange).toBeCalledWith(expect.anything({ type: 'click' }), { schema, value: 'foo' });
	});

	it('should trigger onFinish on blur', async () => {
		// given
		const onFinish = jest.fn();
		render(
			<Radios
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={onFinish}
				schema={schema}
				value="toto"
			/>,
		);

		// when
		fireEvent.blur(screen.getAllByRole('radio')[0]);

		// then
		expect(onFinish).toBeCalledWith(expect.anything({ type: 'blur' }), { schema });
	});
});
