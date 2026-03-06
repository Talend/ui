import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Radios from './Radios.component';

vi.unmock('@talend/design-system');

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
				onChange={vi.fn()}
				onFinish={vi.fn()}
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
				onChange={vi.fn()}
				onFinish={vi.fn()}
				schema={inlineSchema}
				value="toto"
			/>,
		);

		// then
		const radios = screen.getAllByRole('radio');
		radios.forEach(radio => expect(radio.parentElement.parentElement.className).toContain('_row_'));
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
				onChange={vi.fn()}
				onFinish={vi.fn()}
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
		const onChange = vi.fn();
		render(
			<Radios
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={onChange}
				onFinish={vi.fn()}
				schema={schema}
				value="toto"
			/>,
		);

		// when
		await userEvent.click(screen.getAllByRole('radio')[0]);

		// then
		expect(onChange).toHaveBeenCalledWith(expect.anything({ type: 'click' }), {
			schema,
			value: 'foo',
		});
	});

	it('should trigger onFinish on blur', async () => {
		// given
		const onFinish = vi.fn();
		render(
			<Radios
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={vi.fn()}
				onFinish={onFinish}
				schema={schema}
				value="toto"
			/>,
		);

		// when
		fireEvent.blur(screen.getAllByRole('radio')[0]);

		// then
		expect(onFinish).toHaveBeenCalledWith(expect.anything({ type: 'blur' }), { schema });
	});
});
